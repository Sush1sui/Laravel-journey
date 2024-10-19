<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Product</title>
</head>
<body>
    <h1>Edit a Product</h1>

    @if ($errors->any())
        <div>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{$error}}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{route('product.update', ['product' => $product])}}" method="POST">
        @csrf
        @method('put')
        <div>
            <label for="name">Name</label>
            <input type="text" name="name" placeholder="name" value="{{$product->name}}" />
        </div>
        <br>
        <div>
            <label for="qty">Quantity</label>
            <input type="number" name="qty" placeholder="69" value="{{$product->qty}}" />
        </div>
        <br>
        <div>
            <label for="price">Price</label>
            <input type="text" name="price" placeholder="69.00" value="{{$product->price}}" />
        </div>
        <br>
        <div>
            <label for="description">Description</label>
            <br>
            <textarea name="description" id="description" placeholder="Enter description here..." cols="30" rows="5">{{$product->description}}</textarea>
        </div>
        <br><br>
        <button type="submit">Edit Product</button>
    </form>
</body>
</html>