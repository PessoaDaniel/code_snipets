$(document).ready(() => {
    if(!window.localStorage.getItem('SNIPPETS')) {
        const snippets = [];
        window.localStorage.setItem('SNIPPETS', JSON.stringify(snippets));
    } else {
        let  snippets = JSON.parse(window.localStorage.getItem('SNIPPETS'));
        if (!snippets.length) {
            $('#no-snippets').show();
        } else {
            for (let snippet of snippets) {
                let snippetTemplate = $('#snippet-template').clone();
                $(snippetTemplate).removeAttr('id');
                $(snippetTemplate).find(".snippet-title:first-of-type").html(snippet.name);
                $(snippetTemplate).data('id', snippet.id);
                $(snippetTemplate).find("pre:first-of-type").html(snippet.code);
                $('.content').append($(snippetTemplate).show());
            }
        }
    }

    addSnippetTrigger();
    cancelSnippetTrigger();
    saveSnippetTrigger();
    removeSnippetTrigger();
});

function addSnippetTrigger() {
    $('#add-snippet').click(($event) => {
        $('#form').find('input[name=snippetName]').val('');
        $('#form').find('textarea[name=snippetCode]').val('');
        $('#form').show();
        $('#no-snippets').hide();

    });
}
function cancelSnippetTrigger() {
    $('#cancel-snippet').click(($event) => {
        $('#form').hide();
        let  snippets = JSON.parse(window.localStorage.getItem('SNIPPETS'));

        if (!snippets.length) {
            $('#no-snippets').show();
        }
    });
}
function saveSnippetTrigger() {
    $('#save-snippet').click(($event) => {
        saveSnippet($($event.target));
    });
}
function saveSnippet(target) {
    let isValid =  true;

    const snippetName  = $(target).closest('#form').find('input[name=snippetName]').val();
    const snippetCode  = $(target).closest('#form').find('textarea[name=snippetCode]').val();
    if ((!snippetName || snippetName === '')) {
        $(target).closest('#form').find('input[name=snippetName]').css({
            border: "1px solid red"
        });
        isValid = false;
    }
    if ((!snippetCode || snippetCode === '')) {
        $(target).closest('#form').find('textarea[name=snippetCode]').css({
            border: "1px solid red",
            'border-bottom': 'none'
        });
        $(target).closest('#form').find('#actions').css({
            border: "1px solid red",
            'border-top': 'none'
        });

        isValid = false;
    }
    if (isValid) {
        const id = new Date().valueOf();
        let snippetTemplate = $('#snippet-template').clone();
        $(snippetTemplate).removeAttr('id');
        $(snippetTemplate).find(".snippet-title:first-of-type").html(snippetName);
        $(snippetTemplate).data('id', id);
        $(snippetTemplate).find("pre:first-of-type").html(snippetCode);
        let  snippets = JSON.parse(window.localStorage.getItem('SNIPPETS'));
        snippets.push({
            id: id,
            name: snippetName,
            code: snippetCode
        });
        window.localStorage.setItem('SNIPPETS', JSON.stringify(snippets));
        $('.content').append($(snippetTemplate).show());
        removeSnippetTrigger();
        $('#form').hide();
    }
}

function removeSnippetTrigger() {
    $('.remove-snippet').click(($event) => {
        let  snippets = JSON.parse(window.localStorage.getItem('SNIPPETS'));
        for (let snippet of snippets) {
            if (snippet.id == $($event.target).closest('.snippet').data('id')) {
                snippets.splice(snippets.indexOf(snippet), 1);
            }
        }
        if (!snippets.length) {
            $("#no-snippets").show();
        }
        window.localStorage.setItem('SNIPPETS', JSON.stringify(snippets));
        $($event.target).closest('.snippet').remove();
    });
}