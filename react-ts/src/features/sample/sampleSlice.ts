import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { SampleModel } from '../../app/models/SampleModel';
import { RootState } from '../../app/store/configureStore';
import agent from '../../app/api/agent';


interface SampleState {
    loaded: boolean;
}

const sampleAdapter = createEntityAdapter<SampleModel>();

export const fetchSamplesAsync = createAsyncThunk<SampleModel[], void, { state: RootState }>(
    'sample/fetchSamplesAsync',
    async (_, thunkAPI) => {
        try {
            const response = await agent.Sample.list();
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)
export const fetchSampleAsync = createAsyncThunk<SampleModel, number>(
    'sample/fetchSampleAsync',
    async (id, thunkAPI) => {
        try {
            const response = await agent.Sample.details(id);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)
export const createSampleAsync = createAsyncThunk<SampleModel, SampleModel>(
    'sample/createSampleAsync',
    async (data, thunkAPI) => {
        try {
            const response = await agent.Sample.createSample(data);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)
export const updateSampleAsync = createAsyncThunk<SampleModel, SampleModel>(
    'sample/updateSampleAsync',
    async (data, thunkAPI) => {
        try {
            const response = await agent.Sample.updateSample(data,data.id);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)
export const removeSampleAsync = createAsyncThunk<number, number>(
    'sample/removeSampleAsync',
    async (id, thunkAPI) => {
        try {
            await agent.Sample.deleteSample(id);
            return id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const sampleSlice = createSlice({
    name: 'sample',
    initialState: sampleAdapter.getInitialState<SampleState>({
        loaded: false
    }),
    reducers: {

    },
    extraReducers: (builder => {
        builder.addCase(fetchSamplesAsync.pending, (state) => {
        })
        builder.addCase(fetchSamplesAsync.fulfilled, (state, action) => {
            sampleAdapter.setAll(state, action.payload);
            state.loaded = true;
        });
        builder.addCase(fetchSamplesAsync.rejected, (state, action) => {
            console.log(action);
        });
        builder.addCase(fetchSampleAsync.pending, (state) => {
        })
        builder.addCase(fetchSampleAsync.fulfilled, (state, action) => {
            sampleAdapter.upsertOne(state, action.payload);
        });
        builder.addCase(fetchSampleAsync.rejected, (state, action) => {
            console.log(action);
        });
        builder.addCase(createSampleAsync.pending, (state) => {
        })
        builder.addCase(createSampleAsync.fulfilled, (state, action) => {
            sampleAdapter.upsertOne(state, action.payload);
        });
        builder.addCase(createSampleAsync.rejected, (state, action) => {
            console.log(action);
        });
        builder.addCase(updateSampleAsync.pending, (state) => {
        })
        builder.addCase(updateSampleAsync.fulfilled, (state, action) => {
            sampleAdapter.upsertOne(state, action.payload);
        });
        builder.addCase(updateSampleAsync.rejected, (state, action) => {
            console.log(action);
        });
        builder.addCase(removeSampleAsync.pending, (state) => {
        })
        builder.addCase(removeSampleAsync.fulfilled, (state, action) => {
            sampleAdapter.removeOne(state, action.payload);
        });
        builder.addCase(removeSampleAsync.rejected, (state, action) => {
            console.log(action);
        });

    })
})


export const sampleSelectors = sampleAdapter.getSelectors((state: RootState) => state.sample)
