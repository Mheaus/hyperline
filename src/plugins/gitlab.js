import React from 'react';
import PropTypes from 'prop-types';
import request from 'request';
import { exec } from 'child_process';
import { getHyperlineConfig } from '../utils/config';

import {
  StatusCanceled,
  StatusClosed,
  StatusCreated,
  StatusFailed,
  StatusManual,
  StatusPending,
  StatusRunning,
  StatusSkipped,
  StatusSuccess,
  StatusWarning,
} from '../assets';

function getPipelineStatusColor(status) {
  const colors = { success: '#1aaa55', running: '#1f78d1', failed: '#db3b21', default: '#3d3d3d' };

  return colors[status] || colors.default;
}

function getPipelineStatusIcon(status) {
  const icons = {
    canceled: StatusCanceled,
    closed: StatusClosed,
    created: StatusCreated,
    failed: StatusFailed,
    manual: StatusManual,
    pending: StatusPending,
    running: StatusRunning,
    skipped: StatusSkipped,
    success: StatusSuccess,
    warning: StatusWarning,
  };

  return icons[status] || icons.created;
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

    this.config = getHyperlineConfig();
  }

  componentDidMount() {
    if (this.config.gitlabPrivateToken) {
      this.getGitlabProjectName();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { remote, name, id } = this.state;

    if (prevState.name !== name && name && remote.includes(this.config.gitlabUrl)) {
      this.getGitlabProjectId();
    }

    if (prevState.id !== id && id) {
      console.log(`watching project ${id} pipelines`);

      this.watchPipelines();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getGitlabProjectName = () => {
    const { cwd } = this.props;

    exec('git ls-remote --get-url', { cwd }, (error, remote) => {
      const name = remote.includes('git') ? /\/([a-zA-Z-.]*).git$/gm.exec(remote)[1] : null;

      this.setState({ name, remote: remote.slice(0, remote.length - 1) });
    });
  };

  getProjectInfo = (urlParams, errorCallback = () => {}, callback) => {
    request(
      {
        url: `https://${this.config.gitlabUrl}/api/v4/projects${urlParams}`,
        headers: { 'PRIVATE-TOKEN': this.config.gitlabPrivateToken },
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

  watchPipelines = () => {
    const { id } = this.state;

    this.interval = setInterval(() => {
      this.getProjectInfo(`/${id}/pipelines`, null, pipelines => {
        if (pipelines && pipelines.length !== 0) {
          const lastPipeline = pipelines[0];
          const { status } = lastPipeline;

          this.setState({ pipeline: lastPipeline });

          if (status === 'running' || status === 'created' || status === 'pending') {
            clearInterval(this.interval);
            this.watchPipeline(lastPipeline.id);
          }
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

          if (pipeline.status !== 'running') {
            clearInterval(this.interval);
            setTimeout(() => {
              this.setState({ pipeline: null, lastPipelineStatus: pipeline.status });
              this.watchPipelines();
            }, 5000);
          }
        }
      });
    }, 1000);
  };

  render() {
    const { id, pipeline, name, lastPipelineStatus } = this.state;

    return (
      <div style={{ marginBottom: '0.125rem' }}>
        {id && <span>{`${id} - `}</span>}
        <span style={{ color: getPipelineStatusColor(lastPipelineStatus) }}>{name || ' - '}</span>
        {pipeline && (
          <>
            <span> - </span>
            <span style={{ fill: getPipelineStatusColor(pipeline.status), top: '0.125rem', position: 'relative' }}>
              {React.createElement(getPipelineStatusIcon(pipeline.status))}
            </span>
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
