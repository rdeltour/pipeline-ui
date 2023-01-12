import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ApplicationSettings } from 'shared/types'
import { resolve } from 'path'
import { app } from 'electron'
import { pathToFileURL } from 'url'
import { resolveUnpacked } from 'shared/utils'
import { existsSync, readFileSync, writeFile } from 'fs'
import { info } from 'electron-log'

export const settings = createSlice({
    name: 'settings',
    initialState: {} as ApplicationSettings,
    reducers: {
        // general state changer, not recommended based on how redux works
        setSettings: (state, action: PayloadAction<ApplicationSettings>) => {
            if (action.payload.downloadFolder)
                state.downloadFolder = action.payload.downloadFolder
            if (action.payload.runLocalPipeline)
                state.runLocalPipeline = action.payload.runLocalPipeline
            if (action.payload.localPipelineProps)
                state.localPipelineProps = action.payload.localPipelineProps
            if (action.payload.useRemotePipeline)
                state.useRemotePipeline = action.payload.useRemotePipeline
        },
        changeDownloadPath: (state, action: PayloadAction<string>) => {
            state.downloadFolder = action.payload
        },
    },
})

export const { changeDownloadPath, setSettings } = settings.actions
