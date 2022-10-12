import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function ResumePage() {
    let {id} = useParams()
    const [requestVal, setRequestVal] = useState();
    const [userRepos, setUserRepos] = useState();
    const [userLangs, setUserLangs] = useState();

    React.useEffect(()=>{
        fetch("https://api.github.com/users/"+id,{
            headers:{
                "Accept": "application/vnd.github+json",
                "Authorization": "Bearer " + "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"
            },
            username:id
        }).then((res)=>{
            if (res.status!==200) throw new Error("User not found")
            return res
        }).then(res => res.json()).then((result)=>{
            setRequestVal(result)
        })
        .catch((error)=>{
            console.log(error)
        })


        fetch("https://api.github.com/users/"+id+"/repos",{
            auth:"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",
            username:id,
            headers:{
                "Accept": "application/vnd.github+json",
                "Authorization": "Bearer " + "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"
            }
        }).then((res)=>{
            if (res.status!==200) throw new Error("User not found")
            return res
        }).then(res => res.json()).then((res)=>{
            setUserRepos(res)
            console.log(res)
            return res
        }).then((res)=>{
            let newLangArr = new Map()
            let langDataArr = []
            let promiseArr = []
            res.forEach(element => {
                promiseArr.push(
                    fetch(element.languages_url)
                    .then(result=> result.json())
                    .then((result)=>{
                        console.log(result)
                        for(let [key, val] of Object.entries(result)){
                            console.log(key + " " + Number(val))
                            langDataArr.push([key,val])
                        }
                    })
                    .catch(error=>{throw error})
                )
            })
            Promise.all(promiseArr).then(()=>{
                console.log(langDataArr)
                let total = 0;
                langDataArr.forEach(([key,val])=>{
                    total+=val
                })
                langDataArr.forEach(([key,val])=>{
                    if(newLangArr.has(key)) {
                        newLangArr.set(key, val+newLangArr.get(key))
                    }
                    else {
                        newLangArr.set(key,val)
                    }
                })
                for(let [key, val] of newLangArr){
                    newLangArr.set(key,(newLangArr.get(key)/total*100).toFixed(2))
                }
                console.log(newLangArr)
                setUserLangs(newLangArr)
            })
            
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])

    React.useEffect(()=>{
        console.log(requestVal)
    })

    React.useEffect(()=>{
        console.log(userLangs)
    },[userLangs])

    return(
        requestVal?<div>
            <h1>{requestVal.name}</h1>
            <p>Member since: {requestVal.created_at.slice(0,4)}</p>
            <p>Owns {userRepos? userRepos.length:"Loading!"} repositories</p>
            {userLangs?Array.from(userLangs, ([key, val])=>{return <p key={key}>{key}:{val}</p>}):""}
        </div>
        :
        <p>Loading!</p>
    )
}