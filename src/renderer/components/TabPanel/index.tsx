import { NewJobPane } from '../NewJobPane'
import { JobDetailsPane } from '../JobDetailsPane'
import { Job, JobState } from 'shared/types/pipeline'

import styles from './styles.module.sass'

export function TabPanel({ job, isSelected, removeJob, updateJob }) {
  
  return (
    <div
      className={styles.TabPanel}
      role="tabpanel"
      hidden={!isSelected}
      aria-labelledby={`tab-${job.id}`}
      tabIndex={0}
    >
      {job.state == JobState.NEW ? 
        <NewJobPane job={job} removeJob={removeJob} updateJob={updateJob}/>
        : 
        <JobDetailsPane job={job} removeJob={removeJob} updateJob={updateJob}/>
      }
    </div>
  )
}
