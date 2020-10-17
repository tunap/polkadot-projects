import { useState, useEffect } from 'react';
import { useSubstrate } from '../substrate-lib';

const useBlockNumber = () => {
    const [time, setTime] = useState(0);
    const [blockNumber, setBlockNumber] = useState(undefined);
    const { api, apiState } = useSubstrate();

    useEffect(() => {
        if (apiState != 'READY') { return; }
        const { bestNumber } = api && api.derive && api.derive.chain;
        bestNumber && bestNumber(number => {
            setBlockNumber(number.toNumber());
            setTime(0);
        }).catch(console.error);
    }, [time, setBlockNumber]);

    const timer = () => setTime(time => time + 1);
    useEffect(() => {
        const id = setInterval(timer, 1000);

        return () => clearInterval(id);
    }, [setTime]);

    return [blockNumber]

};

export default useBlockNumber;