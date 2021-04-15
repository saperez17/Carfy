const Clock = ()=>{
    const[date, setDate] = useState({date_now: new Date().toLocaleTimeString()})

    useEffect(()=>{
        const timerId = setInterval(()=>{
            setDate({...date, date_now:new Date().toLocaleTimeString()})
        },1000);
        return function cleanup(){
            clearInterval(timerId);
        }
    },[])

    return(
        <div>
            <h1>Time now:</h1>
            {date.date_now}
        </div>
    )
}

export { Clock }