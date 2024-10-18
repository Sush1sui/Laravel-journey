<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Product</title>
</head>
<body>
    <h1>Create a Product</h1>

    @if ($errors->any())
        <div>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{$error}}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{route('product.store')}}" method="POST">
        @csrf
        @method('post')
        <div>
            <label for="name">Name</label>
            <input type="text" name="name" placeholder="name" />
        </div>
        <br>
        <div>
            <label for="qty">Quantity</label>
            <input type="number" name="qty" placeholder="69" />
        </div>
        <br>
        <div>
            <label for="price">Price</label>
            <input type="text" name="price" placeholder="69.00" />
        </div>
        <br>
        <div>
            <label for="description">Description</label>
            <br>
            <textarea name="description" id="description" placeholder="Enter description here..." cols="30" rows="5"></textarea>
        </div>
        <br><br>
        <button type="submit">Save New Product</button>
    </form>
</body>
</html>