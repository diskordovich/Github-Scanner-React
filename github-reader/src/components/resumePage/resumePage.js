import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RepoInfo from "./repoInfoTable/repoInfo";


export default function ResumePage() {
    let {id} = useParams()
    const [loadStatus, setLoadStatus] = useState("LOADING")
    const [requestVal, setRequestVal] = useState();
    const [userRepos, setUserRepos] = useState();
    const [userLangs, setUserLangs] = useState();

    React.useEffect(()=>{
        fetch("https://api.github.com/users/"+id,{
            username:id
        }).then((res)=>{
            if (res.status!==200) throw new Error("User not found")
            return res
        }).then(res => res.json()).then((result)=>{
            setRequestVal(result)
        })
        .catch((error)=>{
            setLoadStatus("ERROR")
            console.log(error)
        })


        fetch("https://api.github.com/users/"+id+"/repos",{
            username:id,
        }).then((res)=>{
            if (res.status!==200) throw new Error("User not found")
            return res
        }).then(res => res.json()).then((res)=>{
            let sortedList = res
            sortedList.sort((a,b)=>{
                let dateA = new Date(a.created_at)
                let dateB = new Date(b.created_at)
                
                if (dateA < dateB) return 1
                else if (dateA > dateB) return -1
                else return 0
            })
            setUserRepos(sortedList)
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
                        for(let [key, val] of Object.entries(result)){
                            langDataArr.push([key,val])
                        }
                    })
                    .catch(error=>{throw error})
                )
            })
            Promise.all(promiseArr).then(()=>{
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
                setUserLangs(newLangArr)
                setLoadStatus("DONE")
            })
            
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])


    return(
        loadStatus=="DONE"?<div>
            <h1>{requestVal.name}</h1>
            <p>Member since: {requestVal.created_at.slice(0,4)}</p>
            <p>Owns {userRepos? userRepos.length:"Loading!"} repositories</p>
            {userLangs?Array.from(userLangs, ([key, val])=>{return <p key={key}>{key}:{val}%</p>}):""}
            {userRepos?userRepos.slice(0,9).map((repoData)=>{
                return <RepoInfo key={repoData.name} props={repoData}></RepoInfo>
            }):""}

            
        </div>
        :loadStatus=="LOADING"?
        <p>Loading!</p>:
        <p>User not found</p>
    )
}