@extends('layouts.app')

@section('content')
    <h1 class="text-4xl font-['Press Start 2P'] text-yellow-400 mb-6">Personajes</h1>

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
    </form>

    <!-- Lista de personajes -->
    <div class="character-grid" id="character-grid">
        @if ($characters)
            @foreach ($characters as $character)
                <div class="character-card">
                    <h3>{{ $character['name'] }}</h3>
                    <img src="{{ $character['image'] }}" alt="{{ $character['name'] }}">
                    <br>
                    <span>Género: {{ $character['gender'] }}</span>
                    <span>Estado: {{ $character['status'] }}</span>
                    <span>Especie: {{ $character['species'] }}</span>
                    <span>Origen: {{ $character['origin']['name'] }}</span>
                    <span>Ubicación: {{ $character['location']['name'] }}</span>
                </div>
            @endforeach
        @else
            <span>No se encontraron personajes</span>
        @endif
    </div>

    <!-- Paginación -->
    <div class="pagination" id="pagination-links">
        @if ($info['pages'] > 1)
            @if ($info['prev'])
                <a href="{{ route('characters.index', ['page' => $info['prev']] + request()->all()) }}" class="page-link"
                    data-page="{{ $info['prev'] }}">Anterior</a>
            @endif
            @for ($i = 1; $i <= $info['pages']; $i++)
                <a href="{{ route('characters.index', ['page' => $i] + request()->all()) }}"
                    class="page-link {{ request('page', 1) == $i ? 'active' : '' }}"
                    data-page="{{ $i }}">{{ $i }}</a>
            @endfor
            @if ($info['next'])
                <a href="{{ route('characters.index', ['page' => $info['next']] + request()->all()) }}" class="page-link"
                    data-page="{{ $info['next'] }}">Siguiente</a>
            @endif
        @endif
    </div>

@endsection


@section('scripts')

<script>
    const filterForm = document.getElementById('filter-form');
    const characterGrid = document.getElementById('character-grid');
    const paginationLinks = document.getElementById('pagination-links');

    // Función para realizar solicitudes AJAX
    const fetchCharacters = (queryParams = '') => {
        fetch(`{{ route('characters.index') }}?${queryParams}`, {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .then(data => {
            // Si no hay personajes, mostrar mensaje
            if (data.characters.length === 0) {
                alert('No se encontraron personajes con los criterios seleccionados.');
                characterGrid.innerHTML = '<p>No se encontraron personajes.</p>';
                paginationLinks.innerHTML = '';
                return;
            }

            // Actualizar los personajes
            let charactersHtml = '';
            data.characters.forEach(character => {
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

            // Actualizar la paginación
            //RevisarPaginacion 22/11/24
            let paginationHTML = '';
            if (data.info.prev) {
                paginationHTML += `<a href="#" class="page-link" data-page="${data.info.prev}">Anterior</a>`;
            }
            for (let i = 1; i <= data.info.pages; i++) {
                paginationHTML += `<a href="#" class="page-link ${data.info.current == i ? 'active' : ''}" data-page="${i}">${i}</a>`;
            }
            if (data.info.next) {
                paginationHTML += `<a href="#" class="page-link" data-page="${data.info.next}">Siguiente</a>`;
            }
            paginationLinks.innerHTML = paginationHTML;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al cargar los personajes.');
            characterGrid.innerHTML = '<p>No se han encontrado personajes con esos criterios.</p>';
            paginationLinks.innerHTML = '';
        });
    };

    // Detectar cambios en el formulario
    filterForm.addEventListener('input', () => {
        const formData = new FormData(filterForm);
        const queryParams = new URLSearchParams(formData).toString();
        fetchCharacters(queryParams);
    });

    // Manejar la paginación
    paginationLinks.addEventListener('click', (event) => {
        event.preventDefault();
        const pageLink = event.target.closest('.page-link');
        if (pageLink) {
            const page = pageLink.dataset.page;
            const formData = new FormData(filterForm);
            formData.set('page', page);
            const queryParams = new URLSearchParams(formData).toString();
            fetchCharacters(queryParams);
        }
    });
</script>


@endsection
