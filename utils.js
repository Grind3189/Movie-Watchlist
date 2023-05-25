  function changeIcon(id){
        const btnWatchlist = document.getElementById(id)
        btnWatchlist.classList.add('added')
        btnWatchlist.textContent = '✔'
        document.getElementById(`${id}-status`).innerText = 'Added'
    }
    
    export {changeIcon}