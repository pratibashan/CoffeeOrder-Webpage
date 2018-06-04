


$(document).ready(() => {

    $("#btnAllOrder").on('click',(e) => {        
        getAllOrders() 
        e.preventDefault()       
    })


    $("#btnOrderByEmail").on('click',(e) => {
        
        let formSearch =
            ` <div class="container">
                <div class="jumbotron">
                    <h3 class="text-center">Search Order by Email Id</h3>
                    <form id ="searchForm">
                        <input type="text" class="form-control" id ="searchEmail" placeholder ="Enter your Email Id...">
                    </form>
                </div>
            </div>`

         $('#orders').html(formSearch)
         
         $("#searchForm").on('submit',(e) => {
            let searchEmailid =$('#searchEmail').val()
            getOrderByEmailid(searchEmailid)
            e.preventDefault()
         }) 
        
        e.preventDefault()
    })



    $("#btnNewOrder").on('click',(e) => {
        
        let formSearch =
                    ` <div class="container">
                        <div class="jumbotron">
                            <h3 class="text-center">Create Your Coffee Order</h3>
                            <form id ="submitForm">

                                <input type="text" class="form-control" id="txtCoffeeType" placeholder="Enter Coffee type ...">
                                <br/>
                                <input type="text" class="form-control" id ="txtEmailid" placeholder ="Enter your Emailid...">
                                <br/>
                                <button type="submit" class="btn btn-danger" id ="btnSubmit">Submit</button>

                            </form>
                        </div>
                    </div>`

     $('#orders').html(formSearch)
     
    $("#submitForm").on('submit',(e) => {
            let coffeeTypeValue =$('#txtCoffeeType').val()
            let emailidValue =$('#txtEmailid').val()
            createCoffeeOrder(coffeeTypeValue,emailidValue)
                alert("Your Order is Created")
                searchEmailid.empty()
                e.preventDefault()
              })
    
    e.preventDefault()
    })  
})

$("#btnDelete").on('click',(e) => {
        
    let formSearch =
        ` <div class="container">
            <div class="jumbotron">
                <h3 class="text-center">Delete Order by Email Id</h3>
                <form id ="searchForm">
                    <input type="text" class="form-control" id ="searchEmail" placeholder ="Enter your Email Id...">
                </form>
            </div>
        </div>`

     $('#orders').html(formSearch)
     
     $("#searchForm").on('submit',(e) => {
        let searchEmailid =$('#searchEmail').val()
        deleteOrderByEmailid(searchEmailid)
        alert("Your Order is Deleted")
        searchEmailid.empty()
        e.preventDefault()
     }) 
    
    e.preventDefault()
})



function getAllOrders() {
    console.log("response")
    axios.get("http://dc-coffeerun.herokuapp.com/api/coffeeorders/")
     .then((response) => {
           console.log(response)
            let orders = response.data
            console.log(orders)
            let orderDetails =''
            $.each(orders,(index,order) => {
                 orderDetails +=
                 `<div class="col-md-8">            
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Order ID:</strong>${order._id}</li>
                        <li class="list-group-item"><strong>Coffee:</strong>${order.coffee}</li>
                        <li class="list-group-item"><strong>Email ID:</strong>${order.emailAddress}</li>                 
                    </ul>
                </div>`
            })
            $('#orders').html(orderDetails) 
          })
        .catch((error) => {
        console.log(error)
         })
    }

    
    function getOrderByEmailid (emailid){ 
        console.log(emailid)   
        
        axios.get("http://dc-coffeerun.herokuapp.com/api/coffeeorders/"+emailid)
            .then((response) => {
                console.log(response)
                let orders = response.data  
                console.log(orders)          
             $.each(orders,(index,order)=>{  
                 orderDetails = 
                    `<div class="col-md-8">            
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Order ID:</strong>${orders._id}</li>
                            <li class="list-group-item"><strong>Coffee:</strong>${orders.coffee}</li>
                            <li class="list-group-item"><strong>Email ID:</strong>${orders.emailAddress}</li>                 
                        </ul>
                    </div>`
             })
             $("#orders").append(orderDetails) 
                 })
                 
           
            .catch((error) => {
                console.log(error)
            })
         }
        
    function createCoffeeOrder(coffee,emailid) {
             console.log(coffee,emailid)
            axios({
                method: 'post',
                url: 'http://dc-coffeerun.herokuapp.com/api/coffeeorders/',
                data: {
                  coffee: coffee,
                  emailAddress: emailid
                }
              }).then(function (response) {
                return response.data
                
              }).catch(function (error) {
                console.log(error)
              })
             
             
         } 
         
         function deleteOrderByEmailid (emailid){ 
            console.log(emailid)   
            
            axios.get("http://dc-coffeerun.herokuapp.com/api/coffeeorders/"+emailid)
                .then((response) => {
                    console.log(response)
                    let orders = response.data  
                    console.log(orders)          
                 $.each(orders,(index,order)=>{  
                     orderDetails = 
                        `<div class="col-md-8">            
                            <ul class="list-group">
                                <li class="list-group-item"><strong>Order ID:</strong>${orders._id}</li>
                                <li class="list-group-item"><strong>Coffee:</strong>${orders.coffee}</li>
                                <li class="list-group-item"><strong>Email ID:</strong>${orders.emailAddress}</li>                 
                            </ul>
                        </div>`
                 })
                 $("#orders").remove(orderDetails) 
                }).catch((error) => {
                    console.log(error)
                })
             }

