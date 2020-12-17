$(document).ready(function(){

    $('#display-board-forms').on('click', function(){

        $('#display-board-forms').removeClass('btn-dark')
        $('#display-board-forms').addClass('btn-outline-dark')
        $('#display-thread-forms').removeClass('btn-outline-dark')
        $('#display-thread-forms').addClass('btn-dark')
        $('#display-reply-forms').removeClass('btn-outline-dark')
        $('#display-reply-forms').addClass('btn-dark')
    
        $('#board-forms').removeClass('d-none')
        $('#thread-forms').addClass('d-none')
        $('#reply-forms').addClass('d-none')
    
    })
    
    $('#display-thread-forms').on('click', function(){
    
        $('#display-thread-forms').removeClass('btn-dark')
        $('#display-thread-forms').addClass('btn-outline-dark')
        $('#display-board-forms').removeClass('btn-outline-dark')
        $('#display-board-forms').addClass('btn-dark')
        $('#display-reply-forms').removeClass('btn-outline-dark')
        $('#display-reply-forms').addClass('btn-dark')
    
        $('#thread-forms').removeClass('d-none')
        $('#board-forms').addClass('d-none')
        $('#reply-forms').addClass('d-none')
    
    })
    
    $('#display-reply-forms').on('click', function(){
    
        $('#display-reply-forms').removeClass('btn-dark')
        $('#display-reply-forms').addClass('btn-outline-dark')
        $('#display-board-forms').removeClass('btn-outline-dark')
        $('#display-board-forms').addClass('btn-dark')
        $('#display-thread-forms').removeClass('btn-outline-dark')
        $('#display-thread-forms').addClass('btn-dark')
    
        $('#reply-forms').removeClass('d-none')
        $('#board-forms').addClass('d-none')
        $('#thread-forms').addClass('d-none')
    
    })
    
    function showModal(message) {
        document.querySelector('#message').textContent = message
        $('#modal').modal('show')
    }
    
    // Handling board forms
    
    document.querySelector('#add-board').addEventListener('submit', (event) => {
    
        event.preventDefault()
    
        let title = document.querySelector('#add-board .board-title').value
        let password = document.querySelector('#add-board .add-board-password').value
        
        let data = new URLSearchParams()
        data.append('title', title)
        data.append('password', password)
    
        document.querySelector('#add-board .board-title').value = ''
        document.querySelector('#add-board .add-board-password').value = ''
    
        fetch('/api/boards', {method: 'post', body: data}).then(
            res => res.json()
        ).then(res => showModal(res.message)).catch(err => console.log(err))
    });
    
    document.querySelector('#report-board').addEventListener('submit', (event) => {
    
        event.preventDefault()
    
        let title = document.querySelector('#report-board .board-title').value
    
        let data = new URLSearchParams()
        data.append('title', title)
    
        document.querySelector('#report-board .board-title').value = ''
    
        fetch('/api/boards', {method: 'put', body: data}).then(
            res => res.json()
        ).then(res => showModal(res.message)).catch(err => console.log(err))
    
    });
    
    document.querySelector('#delete-board').addEventListener('submit', (event) => {
    
        event.preventDefault()
    
        let title = document.querySelector('#delete-board .board-title').value
        let password = document.querySelector('#delete-board .add-board-password').value
        
        let data = new URLSearchParams()
        data.append('title', title)
        data.append('password', password)
    
        document.querySelector('#delete-board .board-title').value = ''
        document.querySelector('#delete-board .add-board-password').value = ''
    
        fetch('/api/boards', {method: 'delete', body: data}).then(
            res => res.json()
        ).then(res => showModal(res.message)).catch(err => console.log(err))
    });

    // Handling thread forms 

    document.querySelector('#add-thread').addEventListener('submit', (event) => {

        event.preventDefault()
    
        let title = document.querySelector('#add-thread .board-title').value
        let url = 'api/threads/' + title

        let text = document.querySelector('#add-thread .thread-text').value
        let password = document.querySelector('#add-thread .password').value
        
        let data = new URLSearchParams()
        data.append('threadText', text)
        data.append('threadPassword', password)
    
        document.querySelector('#add-thread .board-title').value = ''
        document.querySelector('#add-thread .thread-text').value = ''
        document.querySelector('#add-thread .password').value = ''
    
        fetch(url, {method: 'post', body: data}).then(
            res => res.json()
        ).then(res => showModal(res.message)).catch(err => console.log(err))
    })

    document.querySelector('#get-threads').addEventListener('submit', (event) => {

        event.preventDefault()
    
        let title = document.querySelector('#get-threads .board-title').value
        let url = 'api/board?board=' + title 
    
        document.querySelector('#get-threads .board-title').value = ''
    
        async function fetchThread() {
            try {
                let res = await fetch(url, {method: 'get'})
                let data = await res.json()
                if (data.message == true) window.location = '/api/threads/' + title
                else showModal('Impossible to get threads because this board doesn\'t exist')
            } 
            catch (error) {
                console.log('error: ' + error)
            }
        }

        fetchThread()

    })

    document.querySelector('#report-thread').addEventListener('submit', (event) => {

        event.preventDefault()
    
        let title = document.querySelector('#report-thread .board-title').value
        let url = 'api/threads/' + title

        let id = document.querySelector('#report-thread .thread-id').value

        let data = new URLSearchParams()
        data.append('threadId', id)
    
        document.querySelector('#report-thread .board-title').value = ''
        document.querySelector('#report-thread .thread-id').value = ''
    
        async function fetchThread() {
            try {
                let response = await fetch(url, {method: 'put', body: data})
                let res = await response.json()
                showModal(res.message)
            } 
            catch (error) {
                console.log('error: ' + error)
            }
        }

        fetchThread()

    })

    document.querySelector('#delete-thread').addEventListener('submit', (event) => {

        event.preventDefault()
    
        let board = document.querySelector('#delete-thread .board-title').value
        let url = 'api/threads/' + board

        let thread = document.querySelector('#delete-thread .thread-id').value
        let password = document.querySelector('#delete-thread .password').value

        let data = new URLSearchParams()
        data.append('threadId', thread)
        data.append('threadPassword', password)
    
        document.querySelector('#delete-thread .board-title').value = ''
        document.querySelector('#delete-thread .thread-id').value = ''
        document.querySelector('#delete-thread .password').value = ''
    
        async function fetchThread() {
            try {
                let response = await fetch(url, {method: 'delete', body: data})
                let res = await response.json()
                showModal(res.message)
            } 
            catch (error) {
                console.log('error: ' + error)
            }
        }

        fetchThread()

    })

    // Handling thread forms

    document.querySelector('#add-reply').addEventListener('submit', (event) => {

        event.preventDefault()
    
        let board = document.querySelector('#add-reply .board-title').value
        let url = 'api/replies/' + board

        let thread = document.querySelector('#add-reply .thread-id').value
        let reply = document.querySelector('#add-reply .reply-text').value
        let password = document.querySelector('#add-reply .password').value
        
        let data = new URLSearchParams()
        data.append('threadId', thread)
        data.append('replyText', reply)
        data.append('replyPassword', password)

        console.log(data)
    
        document.querySelector('#add-reply .board-title').value = ''
        document.querySelector('#add-reply .thread-id').value = ''
        document.querySelector('#add-reply .reply-text').value = ''
        document.querySelector('#add-reply .password').value = ''
    
        fetch(url, {method: 'post', body: data}).then(
            res => res.json()
        ).then(res => showModal(res.message)).catch(err => console.log(err))
    })

    document.querySelector('#get-replies').addEventListener('submit', (event) => {

        event.preventDefault()
    
        let board = document.querySelector('#get-replies .board-title').value
        let thread = document.querySelector('#get-replies .thread-id').value

        let urlBoard = 'api/board?board=' + board
        let urlThread = 'api/threads/' + board + '/thread?thread=' + thread
    
        document.querySelector('#get-replies .board-title').value = ''
        document.querySelector('#get-replies .thread-id').value = ''
    
        async function fetchThread() {
            try {
                let res = await fetch(urlBoard, {method: 'get'})
                let data = await res.json()
                if (data.message == false) showModal('Impossible to get replies because this board doesn\'t exist')
                else {
                    res = await fetch(urlThread, {method: 'get'})
                    data = await res.json()
                    if (data.message == true) window.location = '/api/replies/' + board + '?thread=' + thread
                    else showModal('Impossible to get replies because this thread doesn\'t exist') 
                }
            } 
            catch (error) {
                console.log('error: ' + error)
            }
        }

        fetchThread()

    })

    document.querySelector('#report-reply').addEventListener('submit', (event) => {

        event.preventDefault()
    
        let board = document.querySelector('#report-reply .board-title').value
        let thread = document.querySelector('#report-reply .thread-id').value
        let reply = document.querySelector('#report-reply .reply-id').value

        let url = 'api/replies/' + board

        let data = new URLSearchParams()
        data.append('threadId', thread)
        data.append('replyId', reply)
    
        document.querySelector('#report-reply .board-title').value = ''
        document.querySelector('#report-reply .thread-id').value = ''
        document.querySelector('#report-reply .reply-id').value = ''
    
        async function fetchThread() {
            try {
                let response = await fetch(url, {method: 'put', body: data})
                let res = await response.json()
                showModal(res.message)
            } 
            catch (error) {
                console.log('error: ' + error)
            }
        }

        fetchThread()

    })

    document.querySelector('#delete-reply').addEventListener('submit', (event) => {

        event.preventDefault()
    
        let board = document.querySelector('#delete-reply .board-title').value
        let thread = document.querySelector('#delete-reply .thread-id').value
        let reply = document.querySelector('#delete-reply .reply-id').value
        let password = document.querySelector('#delete-reply .password').value

        let url = 'api/replies/' + board

        let data = new URLSearchParams()
        data.append('threadId', thread)
        data.append('replyId', reply)
        data.append('replyPassword', password)
    
        document.querySelector('#delete-reply .board-title').value = ''
        document.querySelector('#delete-reply .thread-id').value = ''
        document.querySelector('#delete-reply .reply-id').value = ''
        document.querySelector('#delete-reply .password').value = ''
    
        async function fetchThread() {
            try {
                let response = await fetch(url, {method: 'delete', body: data})
                let res = await response.json()
                showModal(res.message)
            } 
            catch (error) {
                console.log('error: ' + error)
            }
        }

        fetchThread()

    })

})
