import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { SampleModel } from '../../app/models/SampleModel';
import { RootState } from '../../app/store/configureStore';
import agent from '../../app/api/agent';

interface SampleState {
    loaded: boolean;
}

const sampleAdapter = createEntityAdapter<SampleModel>();

export const fetchSamplesAsync = createAsyncThunk<SampleModel[]>(
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

export const sampleSlice = createSlice({
    name: 'sample',
    initialState: sampleAdapter.getInitialState<SampleState>({
        loaded: false
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchSamplesAsync.pending, (state) => {
            state.loaded = false;
        })
        builder.addCase(fetchSamplesAsync.fulfilled, (state, action) => {
            sampleAdapter.setAll(state, action.payload);
            state.loaded = true;
        });
        builder.addCase(fetchSamplesAsync.rejected, (state, action) => {
            console.log(action);
        });
    })
})

export const sampleSelectors = sampleAdapter.getSelectors((state: RootState) => state.sample)
