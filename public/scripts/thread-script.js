$(document).ready(function(){

    function showModal(message) {
        document.querySelector('#message').textContent = message
        $('#modal').modal('show')
    }

    function reloadPage(url) {
        setInterval(() => {window.location = url}, 1000)
    }

    // Handling thread buttons

    $(document).on('click', '.thread-report-button' ,function(){

        let board = $(this).attr('data-board')
        let thread = $(this).attr('data-thread')

        let url = '/api/threads/' + board

        let data = new URLSearchParams()
        data.append('threadId', thread)

        fetch(url, {method: 'put', body: data}).then(
            res => res.json()
        ).then(res => showModal(res.message)).catch(err => console.log(err))

    })

    $(document).on('click', '.thread-display-button', function(){

        if ($(this).text() == 'Display last replies') $(this).text('Hide last replies')
        else if ($(this).text() == 'Hide last replies') $(this).text('Display last replies')

        let replies = $(this).parents('.thread-item').find('.replies')
        replies.toggleClass('d-none')

    })

    $(document).on('click', '.thread-delete-button', function(){

        if ($(this).text() == 'Show the deletion form') $(this).text('Hide the deletion form')
        else if ($(this).text() == 'Hide the deletion form') $(this).text('Show the deletion form')

        let form = $(this).parents('.thread-item').find('.thread-deletion-form')
        form.toggleClass('d-none')

    })

    // Handling reply buttons

    $(document).on('click', '.reply-report-button', function(){

        let board = $(this).attr('data-board')
        let thread = $(this).attr('data-thread')
        let reply = $(this).attr('data-reply')

        let url = '/api/replies/' + board

        let data = new URLSearchParams()
        data.append('threadId', thread)
        data.append('replyId', reply)

        fetch(url, {method: 'put', body: data}).then(
            res => res.json()
        ).then(res => showModal(res.message)).catch(err => console.log(err))

    })

    $(document).on('click', '.reply-delete-button', function(){

        if ($(this).text() == 'Show the deletion form') $(this).text('Hide the deletion form')
        else if ($(this).text() == 'Hide the deletion form') $(this).text('Show the deletion form')

        let form = $(this).parents('.reply-item').find('.reply-deletion-form')
        form.toggleClass('d-none')

    })

    // Handling addition thread form

    $(document).on('submit', '#add-thread', function(e){

        e.preventDefault()

        let board = document.querySelector('#add-thread .board').value
        let thread = document.querySelector('#add-thread .thread').value
        let password = document.querySelector('#add-thread .password').value

        let url = '/api/threads/' + board

        let data = new URLSearchParams()
        data.append('threadText', thread)
        data.append('threadPassword', password)

        async function fetchThread() {
            try {
                let response = await fetch(url, {method: 'post', body: data})
                let res = await response.json()
                console.log(res.message)
                showModal(res.message)
                if (res.message == 'The thread has been successfully created!') reloadPage(url)
            } 
            catch (error) {
                console.log('error: ' + error)
            }
        }

        fetchThread()

    })

    // Handling addition reply form

    $(document).on('submit', '.add-reply', function(e){

        e.preventDefault()

        let board = $(this).find('.board').val()
        let thread = $(this).find('.thread').val()
        let text = $(this).find('.text').val()
        let password = $(this).find('.password').val()

        let url = '/api/replies/' + board

        let data = new URLSearchParams()
        data.append('threadId', thread)
        data.append('replyText', text)
        data.append('replyPassword', password)

        async function fetchReply() {
            try {
                let response = await fetch(url, {method: 'post', body: data})
                let res = await response.json()
                showModal(res.message)
                if (res.message == 'The reply has been successfully created!') reloadPage('/api/threads/' + board)
            } 
            catch (error) {
                console.log('error: ' + error)
            }
        }

        fetchReply()

    })

    // Handling deletion thread form

    $(document).on('submit', '.thread-deletion-form', function(e){

        e.preventDefault()

        let board = $(this).find('.board').val()
        let thread = $(this).find('.thread').val()
        let password = $(this).find('.password').val()

        let url = '/api/threads/' + board

        let data = new URLSearchParams()
        data.append('threadId', thread)
        data.append('threadPassword', password)

        async function fetchThread() {
            try {
                let response = await fetch(url, {method: 'delete', body: data})
                let res = await response.json()
                console.log(res.message)
                showModal(res.message)
                if (res.message == 'The thread has been successfully deleted!') reloadPage(url)
            } 
            catch (error) {
                console.log('error: ' + error)
            }
        }

        fetchThread()

    })

    // Handling deletion reply form

    $(document).on('submit', '.reply-deletion-form', function(e){

        e.preventDefault()

        let board = $(this).find('.board').val()
        let thread = $(this).find('.thread').val()
        let reply = $(this).find('.reply').val()
        let password = $(this).find('.password').val()

        let url = '/api/replies/' + board

        let data = new URLSearchParams()
        data.append('threadId', thread)
        data.append('replyId', reply)
        data.append('replyPassword', password)

        async function fetchReply() {
            try {
                let response = await fetch(url, {method: 'delete', body: data})
                let res = await response.json()
                showModal(res.message)
                if (res.message == 'The reply has been successfully deleted!') reloadPage('/api/threads/' + board)
            } 
            catch (error) {
                console.log('error: ' + error)
            }
        }

        fetchReply()

    })

})