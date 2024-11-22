<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title','Rick and Morty')</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <script src="{{ asset('js/app.js') }}"></script>

</head>
<body class="bg-gray-900 text-white">
    <nav class="fixed top-0 left-0 right-0 bg-radinet-to-r from-green-400 to-blue-500 text-lg font-bold py-3 shadow-md z-50">
        <div class="container mx-auto flex justify-between items-center px-6">
            <a href="{{route('home')}}" class="text-3x1 font-extrabold text-white no-underline">Rick & Morty</a>
            <ul class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:spacex-6 list-none p-0 m-0">
                <li><a href="{{route('characters.index')}}" class="hover:text-yellow-400 no-underline">Personajes</a></li>
                <li><a href="{{route('locations.index')}}" class="hover:text-yellow-400 no-underline">Ubicación</a></li>
            </ul>
        </div>
    </nav>
    <div class="pt-20 px-4">
        @yield('content')
    </div>

    <footer>
        <p>&copy; Sandra Saransig 2024</p>
    </footer>

    @yield('scripts')
</body>
</html>
