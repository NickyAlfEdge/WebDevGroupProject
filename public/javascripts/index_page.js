/**
 * update petBreed selection when petType is changed
 * @param ele petType option element
 */
function updateSubSelector(ele) {
    const petTypeName = ele.value;
    // petTypeName is null, clear second selection
    if (!petTypeName) {
        $('#petBreed').html('<option value="" selected>Any breed</option>');
    } else {
        const dataDiv = document.getElementById(petTypeName);
        $('#petBreed').html(dataDiv.innerHTML);
    }
}

/**
 * opendetail page
 * @param ele
 */
function openDetail(ele) {
    window.location = $(ele).attr('data-href');
}

$(function() {
    // whether load next page
    let loadMore = true;
    const $window = $(window);

    /**
     * submit search params, update animal list
     */
    $('#submit').click(function() {
        event.preventDefault();
        const json = formDataToJson($('#searchForm'));
        // add one criterion, only search waiting pets
        json['status'] = 'Waiting';
        $.ajax({
            url: '/searchAnimals',
            data: JSON.stringify(json),
            type: 'POST',
            contentType: 'application/json',
            success: function(data) {
                //clear old data
                $('div.animal').remove();
                //load content and change title
                const $contentTitle = $('#contentTitle');
                $contentTitle.text('Search Result');
                //set new content
                $('#contentTitleDiv').after(data);
                // scroll to the search result
                const offset = $contentTitle.offset();
                $('html, body').animate({
                    scrollTop: offset.top,
                }, 800);
                // set load next page true
                loadMore = true;
            },
            error: function(xhr, status, err) {
                alert('search error');
            },
        });
    });

    /**
     * load next page
     * @type {boolean}
     */
    $window.on('scroll touchmove', function() {
        const footerHeight = $('#footer').height();
        const scrollTop = $window.scrollTop();
        const documentHeight = $(document).height();
        const windowHeight = $window.height();
        const loadThreshold = documentHeight - windowHeight - footerHeight;
        if ((scrollTop > loadThreshold) && loadMore) {
            loadMore = false;
            // get form data
            const json = formDataToJson($('#searchForm'));
            // add one criterion, only search waiting pets
            json['status'] = 'Waiting';
            // get current page
            const $pageInfo = $('p.pagination:last');
            const currentPage = Number.parseInt($pageInfo.attr('data-pageNum'));
            const totalPage = Number.parseInt($pageInfo.attr('data-totalPage'));
            const nextPage = (currentPage + 1);
            // load until no result page then stop
            if (currentPage > totalPage) {
                return;
            }
            const reqUrl = '/searchAnimals?pageNum=' + nextPage;
            $.ajax({
                url: reqUrl,
                data: JSON.stringify(json),
                type: 'POST',
                contentType: 'application/json',
                beforeSend: function(xhr) {
                    $('#loadSpinner').show();
                },
                success: function(data) {
                    setTimeout(function(data) {
                        // and new page after last animal row
                        $newPage = $(data);
                        $newPage.hide();
                        $('.animal:last').after($newPage);
                        $newPage.fadeIn();
                        $('#loadSpinner').hide();
                        loadMore = true;
                    }, 2000, data);
                },
                error: function(xhr, status, err) {
                    alert('search error');
                },
            });
        }
    });
});
