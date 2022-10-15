import { useEffect } from "react";
import { fetchSamplesAsync, sampleSelectors } from "../../features/sample/sampleSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

export const useSamples = () => {
    const dispatch = useAppDispatch();
    const { loaded } = useAppSelector(state => state.sample)
    const samplesFromRedux = useAppSelector(sampleSelectors.selectAll);
    const consoleSamples = () => console.log(samplesFromRedux)
    useEffect(() => {
        if (!loaded) {
            dispatch(fetchSamplesAsync());
        }
    }, [loaded, dispatch])
    return [samplesFromRedux, consoleSamples] as const;
}