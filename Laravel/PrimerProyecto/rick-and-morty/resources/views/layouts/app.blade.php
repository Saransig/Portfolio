<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title','Rick and Morty')</title>
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    <script src="{{asset('js/app.js')}}"></script>
</head>
<body>
    <nav>
        <ul>
            <li><a href="{{route('characters.index')}}">Personajes</a></li>
            <li><a href="{{route('locations.index')}}">Ubicación</a></li>
        </ul>
    </nav>
    <div class="container">
        @yield('content')
    </div>

    @yield('scripts')
</body>
</html>
