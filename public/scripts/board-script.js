$(document).ready(function(){

    function showModal(message) {
        document.querySelector('#message').textContent = message
        $('#modal').modal('show')
    }

    $(document).on('click', '.report-button',function(){
        let title = $(this).parents('.board-item').first().attr('data-title')
        let data = new URLSearchParams()
        data.append('title', title)
        fetch('/api/boards', {method: 'put', body: data}).then(
            res => res.json()
        ).then(res => showModal(res.message)).catch(err => console.log(err))
    })

    $(document).on('click','.delete-button' ,function(){

        if ($(this).text() == 'Show the deletion form') $(this).text('Hide the deletion form')
        else if ($(this).text() == 'Hide the deletion form') $(this).text('Show the deletion form')

        let title = $(this).parents('.board-item').first().attr('data-title')
        let form = $(this).parent().siblings('.deletion-form')
        form.toggleClass('d-none')

        form.submit(function(event){
            event.preventDefault()
            let password = form.find('.add-board-password').val()
            let data = new URLSearchParams()
            data.append('title', title)
            data.append('password', password)
            fetch('/api/boards', {method: 'delete', body: data}).then(
                res => res.json()
            ).then(res => {
                showModal(res.message)
                if (res.message === 'The board has been successfully deleted!' ) {
                    $(this).parents('.board-item').first().addClass('d-none')
                }
            }).catch(err => console.log(err))
        })
    })

    $(document).on('submit','#add-board' ,function(event){

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
        ).then(res => {
            showModal(res.message)
            if (res.message === 'The board title has been successfully created!') {
               let boards = $('#list-of-boards').html()
               let board = $('<div></div>')
               board.addClass('board-item')
               board.attr('data-title', title)
               board.append('<h2><a href="/api/threads/'+ title +'">'+ title +'</a></h2>')
               board.append('<div class="d-flex justify-content-around buttons"></div>')
               board.append('<form class="deletion-form d-none"></form>')
               board.find('div.buttons').append('<button class="btn btn-outline-secondary btn-sm report-button" type="button">Report</button>')
               .append('<button class="btn btn-outline-secondary btn-sm delete-button" type="button">Show the deletion form</button>')
               board.find('form.deletion-form').append('<h1 class="h5">Delete the board</h1>')
               .append('<div class="form-group"><input class="form-control add-board-password" type="password" placeholder="password to delete" required></div>')
               .append('<div class="form-group"><button class="btn btn-secondary" type="submit">Delete</button></div>')
               boards = boards + board.prop('outerHTML')
               $('#list-of-boards').html(boards)
            }
        }).catch(err => console.log(err))
    })

})