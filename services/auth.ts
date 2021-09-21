let  url = "http://localhost:3000/api";

export const postAuth = async (objValue:any) => {

    const request = await fetch(`api/auth`,{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(objValue)
    })

    const data = await request.json()
    return data

}
