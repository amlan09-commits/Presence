export const registerUser = async (req, res) => {
    const { firstname, lastname, username, password, email } = req.body
    console.log(req.body)
     return await res.status(200).json({
        message : "OK",
        success : true
    })
}

export const loginUser = async (req, res) => {
    return await res.status(200).json({
        message : "OK",
        success : true
    })
}