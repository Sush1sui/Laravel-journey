<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Home</title>
</head>

<body class="font-sans antialiased dark:bg-black dark:text-white/50">
    <x-nav-link>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    </x-nav-link>

    <!-- container for the content -->
    {{$slot}}
</body>

</html>