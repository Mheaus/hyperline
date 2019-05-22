import React from 'react';
import PropTypes from 'prop-types';
import request from 'request';
import { exec } from 'child_process';

function getPipelineStatusColor(status) {
  const colors = { success: '#1aaa55', running: '#1f78d1', failed: '#db3b21', default: '#3d3d3d' };

  return colors[status] || colors.default;
}

class Gitlab extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      pipeline: null,
      name: null,
      remote: '',
      lastPipelineStatus: 'none',
    };

    const config = global.config.getConfig();

    if (config.env.HYPERLINE_PRIVATE_TOKEN) {
      this.privateToken = config.env.HYPERLINE_PRIVATE_TOKEN || '';
    } else {
      console.warn(
        'Warning : no gitlab privateToken found. Be sure to add `env: { HYPERLINE_PRIVATE_TOKEN: .... }` in your hyper config.'
      );
    }

    this.gitlabUrl = config.env.HYPERLINE_GITLAB_URL || 'gitlab.com';
  }

  componentDidMount() {
    if (this.privateToken) {
      this.getGitlabProjectName();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { remote, name, id } = this.state;

    if (prevState.name !== name && name && remote.includes(this.gitlabUrl)) {
      this.getGitlabProjectId();
    }

    if (prevState.id !== id && id) {
      console.log(`watching project ${id} pipelines`);
      this.watchRunningPipelines();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getGitlabProjectName = () => {
    const { cwd } = this.props;

    exec('git ls-remote --get-url', { cwd }, (error, remote) => {
      const name = remote.includes('git') ? /\/([a-zA-Z-]*).git$/gm.exec(remote)[1] : null;

      this.setState({ name, remote: remote.slice(0, remote.length - 1) });
    });
  };

  getProjectInfo = (urlParams, errorCallback = () => {}, callback) => {
    request(
      {
        url: `https://${this.gitlabUrl}/api/v4/projects${urlParams}`,
        headers: { 'PRIVATE-TOKEN': this.privateToken },
        method: 'GET',
      },
      (error, response, body) => {
        if (error) {
          console.log('error:', error);
          console.error(response);
          errorCallback(error, response);
        }

        callback(JSON.parse(body));
      }
    );
  };

  getGitlabProjectId = () => {
    const { remote, name } = this.state;

    this.getProjectInfo(
      `?search=${name}&membership=true`,
      () => this.setState({ id: 'error' }),
      projects => {
        const project = projects.find(result => result.ssh_url_to_repo === remote) || projects[0];

        if (project && project.id) {
          this.setState({ ...project });
        }
      }
    );
  };

  watchRunningPipelines = () => {
    const { id } = this.state;

    this.interval = setInterval(() => {
      this.getProjectInfo(`/${id}/pipelines?status=running`, null, pipelines => {
        if (pipelines && pipelines.length !== 0) {
          this.setState({ pipeline: pipelines[0] });
          clearInterval(this.interval);
          this.watchPipeline(pipelines[0].id);
        }
      });
    }, 1000);
  };

  watchPipeline = pipelineId => {
    const { id } = this.state;

    this.interval = setInterval(() => {
      this.getProjectInfo(`/${id}/pipelines/${pipelineId}`, null, pipeline => {
        if (pipeline) {
          this.setState({ pipeline });

          if (pipeline.status === 'success' || pipeline.status === 'failed') {
            clearInterval(this.interval);
            setTimeout(() => {
              this.setState({ pipeline: null, lastPipelineStatus: pipeline.status });
              this.watchRunningPipelines();
            }, 5000);
          }
        }
      });
    }, 1000);
  };

  render() {
    const { id, pipeline, name, lastPipelineStatus } = this.state;

    return (
      <div>
        {id && <span>{`${id} - `}</span>}
        <span style={{ color: getPipelineStatusColor(lastPipelineStatus) }}>{name || ' - '}</span>
        {pipeline && (
          <>
            <span> - </span>
            <span style={{ color: getPipelineStatusColor(pipeline.status) }}>{pipeline.status}</span>
          </>
        )}
      </div>
    );
  }
}

Gitlab.propTypes = {
  cwd: PropTypes.string.isRequired,
};

export default Gitlab;
