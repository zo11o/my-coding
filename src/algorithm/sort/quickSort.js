// 快速排序

var quickSort = function(nums) {
    // 快速排序
    var len = nums.length;
    if (len <2) {
        return nums;
    }
    return _quickSort(nums, 0, len - 1);
};

var _quickSort = function(arr, left, right) {
    // 确定基准
    if (left < right) {
        var partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, right);
    }

    return arr;
}

function partition (arr, left, right) {
    var pivoet = left;
    var index = pivoet + 1;

    for (var i = index; i <= right; i ++) {
        if (arr[i] < arr[pivoet]) {
            exch(arr, i, index);
            index ++;
        }
    }
    exch(arr, index - 1, pivoet);
    return index - 1;
}

function exch(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

export default quickSort;