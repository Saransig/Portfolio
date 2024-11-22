@extends('layouts.app')

@section('content')
<h1>Personajes</h1>

<!-- Formulario de búsqueda -->
<form id="filter-form">
    <input type="text" name="name" placeholder="Búsqueda por nombre..." value="{{ request('name') }}">
    <select name="status" id="">
        <option value="">Selecciona por estado...</option>
        <option value="alive" {{ request('status') == 'alive' ? 'selected' : '' }}>Vivo</option>
        <option value="dead" {{ request('status') == 'dead' ? 'selected' : '' }}>Muerto</option>
        <option value="unknown" {{ request('status') == 'unknown' ? 'selected' : '' }}>Desconocido</option>
    </select>
    <select name="species" id="">
        <option value="">Selecciona por especie...</option>
        <option value="human" {{ request('species') == 'human' ? 'selected' : '' }}>Humano</option>
        <option value="alien" {{ request('species') == 'alien' ? 'selected' : '' }}>Alien</option>
    </select>
    <button type="submit">Buscar</button>
</form>

<!-- Lista de personajes -->
<div class="character-grid" id="character-grid">
    @foreach ($characters as $character)
        <div class="character-card">
            <img src="{{$character['image']}}" alt="{{$character['name']}}">
            <h3>{{$character['name']}}</h3>
            <span>Género: {{$character['gender']}}</span>
            <span>Estado: {{$character['status']}}</span>
            <span>Especie: {{$character['species']}}</span>
            <span>Origen: {{$character['origin']['name']}}</span>
            <span>Ubicación: {{$character['location']['name']}}</span>
        </div>
    @endforeach
</div>

<!-- Paginación -->
<div class="pagination" id="pagination-links">
    @if($info['pages'] > 1)
        @if($info['prev'])
            <a href="{{ route('characters.index', ['page' => $info['prev']] + request()->all()) }}" class="page-link" data-page="{{$info['prev']}}">Anterior</a>
        @endif
        @for($i = 1; $i <= $info['pages']; $i++)
            <a href="{{ route('characters.index', ['page' => $i] + request()->all()) }}" class="page-link {{ request('page', 1) == $i ? 'active' : '' }}" data-page="{{$i}}">{{ $i }}</a>
        @endfor
        @if($info['next'])
            <a href="{{ route('characters.index', ['page' => $info['next']] + request()->all()) }}" class="page-link" data-page="{{$info['next']}}">Siguiente</a>
        @endif
    @endif
</div>

@endsection


@section('scripts')
<script>
    const filterForm = document.getElementById('filter-form');
    const characterGrid = document.getElementById('character-grid');
    const paginationLinks = document.getElementById('pagination-links');

    //Funcion para realizar solicitudes AJAX
    const fetchCharacters = (queryParams = '')=>{
        fetch(`{{route('characters.index')}}?${queryParams}`,{
            headers:{'X-Requested-With':'XMLHttpRequest'}
        })
        .then(response => response.json())
        .the(data =>{
            //Actualizar los personajes
            let charactersHtml = '';
            data.characters.forEach(character=>{
                charactersHtml += `
                    <div class="character-card">
                        <img src="${character.image}" alt="${character.name}">
                        <h3>${character.name}</h3>
                        <span>Género: ${character.gender}</span>
                        <span>Estado: ${character.status}</span>
                        <span>Especie: ${character.species}</span>
                        <span>Origen: ${character.origin.name}</span>
                        <span>Ubicación: ${character.location.name}</span>
                    </div>
                `;
            });

            characterGrid.innerHTML = charactersHtml;

            //Actualizar pagina
            let paginationHTML = '';
            if(data.info.prev){

            }
        })
    }

    document.getElementsByName('name')[0].addEventListener('input', function() {
        const query = this.value;

        if (query.length >= 3) { // Solo buscar si hay 3 o más caracteres
            fetch(`/characters/search?name=${query}`)
                .then(response => response.json())
                .then(data => {
                    const suggestions = document.getElementById('suggestions');
                    suggestions.innerHTML = ''; // Limpiar sugerencias anteriores
                    data.results.forEach(character => {
                        const div = document.createElement('div');
                        div.textContent = character.name;
                        suggestions.appendChild(div);
                    });
                })
                .catch(error => console.error('Error al obtener los resultados:', error));
        } else {
            document.getElementById('suggestions').innerHTML = ''; // Limpiar sugerencias si el texto es menor a 3 caracteres
        }
    });
</script>
@endsection
