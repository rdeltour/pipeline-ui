import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import styles from './styles.module.sass'
import { jobsXmlToJson } from 'renderer/pipelineXmlToJson'

const queryClient = new QueryClient()

export function JobsList() {
  return (
    <QueryClientProvider client={queryClient}>
      <Jobs />
    </QueryClientProvider>
  )
}

function Jobs() {
  const { isLoading, error, data } = useQuery(['jobsData'], async () => {
    let res = await fetch('http://localhost:8181/ws/jobs')
    let xmlStr = await res.text()
    return xmlStr
  })

  if (isLoading) return <p>Loading...</p>

  if (error instanceof Error)
    return <p>An error has occurred: {error.message}</p>

  let jobs = jobsXmlToJson(data)
  if (!jobs) {
    return <p>An error has occurred</p>
  }
  return (
    <ul className={styles.jobsList}>
      {jobs.map((job) => (
        <li>{JSON.stringify(job, null, '  ')}</li>
      ))}
    </ul>
  )
}