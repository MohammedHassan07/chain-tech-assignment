console.log('login.js')

// continue button, email input
const btnContinue = document.getElementById('btn-coninue')
const dataInput = document.getElementById('email-input')
const passwordInput = document.getElementById('password')
const errorPara = document.getElementById('error')

btnContinue.addEventListener('click', async (event) => {

    event.preventDefault()

    const data = dataInput.value
    const password = passwordInput.value

    if (data === '' || password == '') {

        errorPara.style.visibility = 'visible'
    } else {
        errorPara.style.visibility = 'hidden'

        try {

            const url = 'http://localhost:3000/user/login'

            const response = await makeRequest(url, { data: data, password: password }, 'POST')

            // const { token } = response
            // window.localStorage.setItem('token', token)

            // window.location.replace('http://127.0.0.1:5500/Frontend/html/home.html')

            // console.log('logIn: ', response)

        } catch (error) {
            console.log('logIn: ', error.message)
        }
    }
})


async function makeRequest(URL, data, type) {
    try {


        const response = await fetch(URL, {

            method: `${type}`,
            headers: {

                "Content-Type": "Application/json",
                "token": `${token}`
            }
        })

        const data = await response.json()

        return data
    } catch (error) {
        console.log('makeRequest -> ', error)

        return
    }
}
