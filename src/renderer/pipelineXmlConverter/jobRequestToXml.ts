import { JobRequest } from 'shared/types/pipeline'

function jobRequestToXml(jobRequest: JobRequest): string {
    console.log("job request is ", jobRequest)

  let xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
  <jobRequest xmlns="http://www.daisy.org/ns/pipeline/data">
    <nicename>${jobRequest.nicename}</nicename>
    <priority>medium</priority>
    <script href="${jobRequest.scriptHref}"/>
    ${jobRequest.inputs.map(input => `<input name="${input.name}"><item value="${input.isFile ? `file://` : ``}${input.value}"/></input>`)
    .join('')}
    ${jobRequest.options.map(option => `<option name="${option.name}">${option.isFile ? `file://` : ``}${option.value}</option>`)
    .join('')}
  </jobRequest>`  
  return xmlString
}

export { jobRequestToXml }