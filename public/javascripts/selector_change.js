/**
 * update petBreed selection when petType is changed
 * @param ele petType option element
 */
function updateSubSelector(ele) {
    const petTypeName = ele.value;
    // petTypeName is null, clear second selection
    // if (!petTypeName) {
    //     $('#petBreed').html('<option value="" selected>Any breed</option>');
    // } else {
    const dataDiv = document.getElementById(petTypeName);
    $('#petBreed').html(dataDiv.innerHTML);
    // }
}
