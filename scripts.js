const canvas = document.querySelector('.convas');

// randomly generating szOfArr withing limit [1,100];
let szOfArr = Math.floor(Math.random() * 101);

// declaring array of sizeOfArr for creating bar
if(szOfArr < 10){
    szOfArr += 2*szOfArr;
}
let arr = new Array(szOfArr);

for(let i=0;i<szOfArr;i++){
    // puhsing element in an array between [1,800] element
    let ele = Math.round(Math.random()*400);
    if(ele<10){
        ele = ele * 5;
    }
    arr[i] = ele;
}

// console.log(arr);
let allbars = document.querySelector('.bars-canvas')
allbars.innerHTML = arr.map((ele,index) => {
    let height = `height:${ele}px`;
    let _id = `bar${index}`
    return(
        
        `
            <div class="bar" id=${_id} style=${height} key=${index}>
                    
            </div>
        `
    )
}).join(' ')

const RenderAfterSorted = () => {
    allbars = document.querySelector('.bars-canvas')
    allbars.innerHTML = arr.map((ele,index) => {
        const height = `height:${ele}px`;
        return(
            
            `
                <div class="bar" style=${height} key=${index}>
                        
                </div>
            `
        )
    }).join(' ')

}


// all bar
let bar = document.querySelectorAll('.bar');
// All sorting algrotihm
const delay = ms => new Promise(res => setTimeout(res, ms));

const BubbleSort = async (bar) => {
    let sz = bar.length;
    // console.log(bar);
    
    for(let i=0;i<sz;++i){
        let _i = document.querySelector(`#bar${i}`);
        for(let j=i+1;j<sz;++j){
            let _j = document.querySelector(`#bar${j}`);
            if(bar[i]>bar[j]){
                _i.style.backgroundColor = "red";
                _j.style.backgroundColor = "blue";
                // console.log(bar[i] , '=>' , bar[j] );
                await delay(1);

                temp = bar[i];
                bar[i] = bar[j];
                // _i.style.backgroundColor = "blue";
                _i.style.height = `${bar[j]}px`;
                // _j.style.backgroundColor = "red";
                await delay(1);
                bar[j] = temp;
                _j.style.height = `${bar[i]}px`;
                // _i.style.backgroundColor = "blue";
                // _j.style.backgroundColor = "red";
                await delay(1);
                await delay(1);


            }
            _i.style.backgroundColor = "";
            _j.style.backgroundColor = "";
        }
    }

    // console.log(bar);
    RenderAfterSorted();
    // console.log(allbars);
    
}

const SelectionSort = async (bar) => {
    let sz = bar.length;
    for(let i=0;i<sz;i++){
        let _i = document.querySelector(`#bar${i}`);
        let min_index = i;
        let _j;
        for(let j=i;j<sz;j++){
            _j = document.querySelector(`#bar${min_index}`);
            if(bar[min_index]>bar[j]){
                min_index = j;
                _i.style.backgroundColor = "red"
                _j.style.backgroundColor = "blue";
                await delay(1);
                _i.style.backgroundColor = ""
                _j.style.backgroundColor = "";
            }
              
        }
        _i.style.backgroundColor = "blue";
        _j.style.backgroundColor = "red";

        await delay(1);

        temp = bar[min_index];
        bar[min_index] = bar[i];

        _j.style.height = `${bar[i]}px`;
        await delay(1);

        bar[i] = temp;
        _i.style.height = `${bar[min_index]}px`;

        await delay(1);            

        _i.style.backgroundColor = "";
        _j.style.backgroundColor = "";   
    }    

    RenderAfterSorted();
    
}


const InsertionSort = async (bar) => {
    let sz = bar.length;
    let j,key;
    let _i;
    let _j;
    let newJ;
    for (i = 1; i < sz; i++)
    { 
        _i = document.querySelector(`#bar${i}`);
        key = bar[i]; 
        j = i - 1; 
        while (j >= 0 && bar[j] > key)
        { 
            _j = document.querySelector(`#bar${j}`);
            newJ = document.querySelector(`#bar${j+1}`);
            bar[j + 1] = bar[j]; 
            await delay(1);
            _j.style.backgroundColor = "red"
            newJ.style.backgroundColor = "blue";
            newJ.style.height = `${bar[j]}px`;
            j = j - 1; 
            await delay(1);
            _j.style.backgroundColor = "";
            newJ.style.backgroundColor = "";
        } 
        bar[j + 1] = key; 
        await delay(1);
        let newjj = document.querySelector(`#bar${j+1}`);
        newjj.style.backgroundColor = "red";
        newjj.style.height = `${key}px`;
        await delay(1);
        newjj.style.backgroundColor = "";
    }
    RenderAfterSorted();
}

function merge(arr, l, m, r)
{
    var n1 = m - l + 1;
    var n2 = r - m;
 
    // Create temp arrays
    var L = new Array(n1);
    var R = new Array(n2);
 
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
 
    // Merge the temp arrays back into arr[l..r]
 
    // Initial index of first subarray
    var i = 0;
 
    // Initial index of second subarray
    var j = 0;
 
    // Initial index of merged subarray
    var k = l;
 
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
 
    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
 
    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }

    RenderAfterSorted();
}
 
// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
function mergeSort(arr,l, r){
    if(l>=r){
        return;//returns recursively
    }
    var m =l+ parseInt((r-l)/2);
    mergeSort(arr,l,m);
    mergeSort(arr,m+1,r);
    merge(arr,l,m,r);
}

const MergeSort = (bar) => {
    mergeSort(bar,0,bar.length-1);

}

const partition = (arr, low, high) => {
  
    // pivot
    let pivot = arr[high];

    // Index of smaller element and
    // indicates the right position
    // of pivot found so far
    let i = (low - 1);
    
    for (let j = low; j <= high - 1; j++) {
        
        // If current element is smaller 
        // than the pivot
        if (arr[j] < pivot) {
            
            // Increment index of 
            // smaller element
            i++;
            // console.log(bar[i] , '=>' , bar[j] );

            let temp = arr[i];
            arr[i] = arr[j];
            // _i.style.backgroundColor = "blue";
            // _j.style.backgroundColor = "red";
            arr[j] = temp;
            // _i.style.backgroundColor = "blue";
            // _j.style.backgroundColor = "red";
        }
    }
    // swap(arr, i + 1, high);
    let temp = arr[i+1];
    arr[i+1] = arr[high];

    arr[high] = temp;    
    return (i + 1);
}

/* The main function that implements QuickSort
          arr[] --> Array to be sorted,
          low --> Starting index,
          high --> Ending index
          */
const QuickSort = (arr, low, high) => {
    if (low < high) {
                 
        // pi is partitioning index, arr[p]
        // is now at right place 
        let pi = partition(arr, low, high);
        
        // Separately sort elements before
        // partition and after partition
        QuickSort(arr, low, pi - 1);
        QuickSort(arr, pi + 1, high);
    }
    RenderAfterSorted();

}



    const HeapSort =( arr) => {
        var N = arr.length;
 
        // Build heap (rearrange array)
        for (var i = Math.floor(N / 2) - 1; i >= 0; i--)
            heapify(arr, N, i);
 
        // One by one extract an element from heap
        for (var i = N - 1; i > 0; i--) {
            // Move current root to end
            var temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
 
            // call max heapify on the reduced heap
            heapify(arr, i, 0);
        }
    }
 
    // To heapify a subtree rooted with node i which is
    // an index in arr[]. n is size of heap
    const heapify = (arr, N, i)=>{
        var largest = i; // Initialize largest as root
        var l = 2 * i + 1; // left = 2*i + 1
        var r = 2 * i + 2; // right = 2*i + 2
 
        // If left child is larger than root
        if (l < N && arr[l] > arr[largest])
            largest = l;
 
        // If right child is larger than largest so far
        if (r < N && arr[r] > arr[largest])
            largest = r;
 
        // If largest is not root
        if (largest != i) {
            var swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
 
            // Recursively heapify the affected sub-tree
            heapify(arr, N, largest);
        }
        RenderAfterSorted();
    }


const select = document.querySelector('#select');
const selectedOption = () => {
    return select.options[select.selectedIndex].value;
}
function sort(){
    const getVal = +selectedOption();  
    switch (getVal) {
        case 1:
            BubbleSort(arr);
            break;
        case 2:
            SelectionSort(arr);
            break;
        case 3:
            InsertionSort(arr);
            break;
        case 4:
            MergeSort(arr);
            break;
        case 5:
            QuickSort(arr,0, arr.length - 1);
            break;
        case 6:
            HeapSort(arr);
            break;
        default:
            alert(`Select options`)
            break;
    }
}

const  refresh = () => {
    window.location.reload()
}

const footer = document.querySelector('.footer_span');
footer.innerText += `© ${new Date().getFullYear()}`;