$(document).ready(function(){

    function showModal(message) {
        document.querySelector('#message').textContent = message
        $('#modal').modal('show')
    }

    function reloadPage(url) {
        setInterval(() => {window.location = url}, 1000)
    }

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

    // Handling addition reply form

    $(document).on('submit', '#add-reply', function(e){

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
                if (res.message == 'The reply has been successfully created!') reloadPage('/api/replies/' + board + '?thread=' + thread)
            } 
            catch (error) {
                console.log('error: ' + error)
            }
        }

        fetchReply()

    })

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
                if (res.message == 'The reply has been successfully deleted!') reloadPage('/api/replies/' + board + '?thread=' + thread)
            } 
            catch (error) {
                console.log('error: ' + error)
            }
        }

        fetchReply()

    })

})