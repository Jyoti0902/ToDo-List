import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmount } from '../Redux/reducers/counterSlice';

const Counterpage = () => {
    const { count } = useSelector((state) => state.counter);
    const dispatch = useDispatch();
    return (
        <>
            <div className="container" style={{ height: 300, width: 300, backgroundColor: 'gray', margin: 'auto', padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="display" style={{ textAlign: 'center' }}>Output: <h1 id='display'>{count}</h1></div>
                <div className="btns" style={{ textAlign: 'center' }} >
                    <button style={{ padding: 15, margin: 20 }} onClick={() => dispatch(increment(count))}>Increment</button>
                    <button style={{ padding: 15, margin: 20 }} onClick={() => dispatch(decrement(count))}>Decrement</button>
                    <button style={{ padding: 15, margin: 20 }} onClick={() => dispatch(incrementByAmount(count, 20))} >Increment by amount</button>
                </div>
            </div>
        </>
    )
}

export default Counterpage