const title = document.querySelector(".title")
const desc = document.querySelector(".desc")
const high = document.querySelector("#high")
const low = document.querySelector("#low")
const add = document.querySelector(".add")
const outer_Todo = document.querySelector(".outer-todo")
const img = document.querySelector(".img")

let id = 0//to give unique id's to inner_Todo so that we specificaly delete item
//bug - when document is loaded the id again set to 0 so becuse of reset of id multiple inner_todo having same id and if we delete any inner_todo than the multiple inner_todo with same id is deleted
//debugg - storing id in a localstorage and check the id whenever the dom content is loaded
let arr_id = []
if(localStorage.getItem("id") != null)
{
    let local_arr_id = JSON.parse(localStorage.getItem("id"))
    console.log(local_arr_id)
    console.log(local_arr_id.length)
    id = local_arr_id[local_arr_id.length-1]
    console.log(id)
}
let arr = []

document.addEventListener("DOMContentLoaded",()=>{
    if(localStorage.getItem("arr") != null) 
    {
        img.style.display = "none"
        const local_arr = JSON.parse(localStorage.getItem("arr"))
        console.log(local_arr)   
        local_arr.forEach((e)=>{
            const inner_Todo = document.createElement("div")
            inner_Todo.classList.add(`${e[4]}`)
            inner_Todo.classList.add("inner-todo")
            const div1 = document.createElement("div")
            const h1 = document.createElement("h1")
            h1.innerHTML = `${e[0]}`.toUpperCase()
            div1.append(h1)
            const imp = document.createElement("div")
            if(e[2])
            {
                imp.innerHTML =`&#x26a1`
            }
            if(e[3])
            {
                imp.innerHTML =`&#x26a1`
                imp.style.opacity = 0.2;
            }
            div1.append(imp)
            const p = document.createElement("p")
            p.innerHTML = `${e[1]}`
            const div2 = document.createElement("div")
            const complete = document.createElement("button")
            complete.classList.add("complete")
            complete.innerHTML = "complete"
            div2.append(complete)
            const del = document.createElement("button")
            del.innerHTML= "delete"
            del.classList.add("delete")
            div2.append(del)

            inner_Todo.append(div1)
            inner_Todo.append(p)
            inner_Todo.append(div2)
            outer_Todo.append(inner_Todo)

            //empty the input after add
            title.value = ""
            desc.value = ""
            low.checked = false
            high.checked = false

            inner_Todo.addEventListener("click",(e)=>{
                const remove_ele = JSON.parse(localStorage.getItem("arr"))
                const filt =  remove_ele.filter((a)=>{
                    return a[4] != e.currentTarget.classList[0]
                })
                console.log(filt)
                localStorage.removeItem("arr")
                localStorage.setItem("arr",JSON.stringify(filt))
                let del_ele = e.target;
                if(del_ele.classList == "delete")
                {
                    e.currentTarget.parentNode.removeChild(e.currentTarget)
                    if(localStorage.getItem("arr") == "[]")
                    {
                        img.style.display = "block"
                    }
                    else
                    {
                        img.style.display = "none"
                    }
                    arr = arr.filter((b)=>{
                        //to remove specific array from main array - because when we are delting an inner_todo that array for specific inner_todo is not deleting so for that im filtering out that array which is deleted when we click on delete
                        if(b[4] != e.currentTarget.classList[0])
                        {
                            return b;
                        }
                    })
                    console.log(arr)
                }
                else if(del_ele.classList == "complete")
                {
                    e.currentTarget.style.opacity = 0.5
                }
                console.log(arr)
            })
        })//forEach
    }//check local storage
    
    if(localStorage.getItem("arr") == "[]")
    {
        img.style.display = "block"
    }
    else
    {
        img.style.display = "none"
    }
})//content loaded

if(localStorage.getItem("arr") != null)
{
    let local_arr2 = JSON.parse(localStorage.getItem("arr"))
        local_arr2.forEach((e)=>{
            arr.push(e)
        })
}

add.addEventListener("click",()=>{
    if(title.value != "" && desc.value != "" && high.checked != false || low.checked != false)
    {
        img.style.display = "none"
        /*
        if(localStorage.getItem("arr") != null)
        {
            //if is checking the condition every time we click on add to do so becuase of that a duplicate is creating on a local storage and that duplicate gives a problem when content is loaded
            solution: i have used this condition checking traverse and push outside the event listener
        let local_arr2 = JSON.parse(localStorage.getItem("arr"))
       
        local_arr2.forEach((e)=>{
            arr.push(e)
        })
        }
        */
       console.log("before push "+arr)
       id++;
       arr_id.push(id)
       localStorage.setItem("id",JSON.stringify(arr_id))
       
       let in_arr = [title.value,desc.value,high.checked,low.checked,id]
        arr.push(in_arr)
        console.log("after push "+ arr)
        localStorage.setItem("arr",JSON.stringify(arr))
        const inner_Todo = document.createElement("div")
        inner_Todo.classList.add(`${id}`)
        inner_Todo.classList.add("inner-todo")

        const div1 = document.createElement("div")

        const h1 = document.createElement("h1")
        h1.innerHTML = `${title.value}`.toUpperCase()
        div1.append(h1)

        const imp = document.createElement("div")
        
        if(high.checked)
        {
            imp.innerHTML =`&#x26a1`
        }
        if(low.checked)
        {
            imp.innerHTML =`&#x26a1`
            imp.style.opacity = 0.2;
        }
        div1.append(imp)

        const p = document.createElement("p")
        p.innerHTML = `${desc.value}`
    
        const div2 = document.createElement("div")
        const complete = document.createElement("button")
        complete.classList.add("complete")
        complete.innerHTML = "complete"
        div2.append(complete)

        const del = document.createElement("button")
        del.innerHTML= "delete"
        del.classList.add("delete")
        div2.append(del)
    
        inner_Todo.append(div1)
        inner_Todo.append(p)
        inner_Todo.append(div2)
        outer_Todo.append(inner_Todo)
        
        //empty the input after add
        title.value = ""
        desc.value = ""
        low.checked = false
        high.checked = false

        inner_Todo.addEventListener("click",(e)=>{
            
            const remove_ele = JSON.parse(localStorage.getItem("arr"))
            const filt =  remove_ele.filter((a)=>{
                return a[4] != e.currentTarget.classList[0]
            })
            console.log(filt)
            localStorage.removeItem("arr")
            localStorage.setItem("arr",JSON.stringify(filt))
            let del_ele = e.target;//return the actual element that has been clicked
            
            if(del_ele.classList == "delete")
            {
               e.currentTarget.parentNode.removeChild(e.currentTarget)
               if(localStorage.getItem("arr") == "[]")
               {
                   img.style.display = "block"
               }
               arr = arr.filter((b)=>{
                   if(b[4] != e.currentTarget.classList[0])
                   {
                       return b;
                    }
                })
                console.log(arr)
            }
            else if(del_ele.classList == "complete")
            {
                e.currentTarget.style.opacity = 0.5
            } 
           
        })
    }
    else
    {
        alert("fill all the required field")
    }   
})


// let ran = [["a", "a", true, false, 0],["b", "b", false, true, 1],["c", "c", true, false, 2],["d", "d", true, false, 3]]
// let filt = ran.filter((e)=>{
//     return e[4] != 3;
// })
// console.log(filt)

