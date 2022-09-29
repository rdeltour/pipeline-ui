import { useState } from 'react'
import { Tab } from '../Tab'
import { TabPanel } from '../TabPanel'
import { Job, JobState } from 'shared/types/pipeline'
import styles from './styles.module.sass'
import { useContext } from 'react'
import { useWindowStore } from 'renderer/store'

export function TabView() {
  const {pipeline} = useWindowStore()
  const [selectedJobId, setSelectedJobId] = useState('')

  // all of this job management stuff should probably go in a higher-level context
  /**start**/
  const [jobs, setJobs] = useState([])
  
  let createJob = () => {
    return {
      id: `job-${jobs.length + 1}`,
      nicename: 'New job',
      state: JobState.NEW,
      data: null
    }
  }
  let addJob = () => {
    let theNewJob = createJob()
    setJobs([...jobs, theNewJob]);
  }

  let removeJob = (jobId) => {
    const jobs_ = jobs.filter((j) => j.id !== jobId);
    setJobs(jobs_);
  }

  let updateJob = (jobId, job) => {
    let j = jobs.find(jobObj => jobObj.id == jobId)
    j = {...job}
    setJobs([...jobs])
  }
  /**end**/

  if (selectedJobId == '' && jobs.length > 0 && jobs[0].id) {
    setSelectedJobId(jobs[0].id)
  }


  return (
    <>
      <div role="tablist" style={styles}>
        {jobs.map((job, idx) => {
          return (
            <Tab
              label={job.nicename}
              isSelected={job.id == selectedJobId}
              onTabSelect={(e) => handleOnTabSelect(job)}
              key={idx}
              id={`tab-${job.id}`}
            />
          )
        })}
        <Tab
          label="+"
          isSelected="false"
          onTabSelect={(e) => addJob()}
          aria-label="Create job"
          id="create-job"
        />
      </div>
      {jobs.map((job, idx) => (
        <TabPanel job={job} key={idx} isSelected={job.id == selectedJobId} removeJob={removeJob} updateJob={updateJob}/>
      ))}
    </>
  )
}