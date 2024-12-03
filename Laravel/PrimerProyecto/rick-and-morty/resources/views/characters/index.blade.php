@extends('layouts.app')

@section('content')
    <h1 class="text-4xl font-['Press Start 2P'] text-yellow-400 mb-6">Personajes</h1>

    <!-- Formulario de búsqueda -->
    <form method="GET" action="{{ route('characters.index') }}">
        <input type="text" name="name" placeholder="Búsqueda por nombre..." value="{{ request('name') }}">
        <select name="status">
            <option value="">Selecciona por estado...</option>
            <option value="alive" {{ request('status') == 'alive' ? 'selected' : '' }}>Vivo</option>
            <option value="dead" {{ request('status') == 'dead' ? 'selected' : '' }}>Muerto</option>
            <option value="unknown" {{ request('status') == 'unknown' ? 'selected' : '' }}>Desconocido</option>
        </select>
        <select name="species">
            <option value="">Selecciona por especie...</option>
            <option value="human" {{ request('species') == 'human' ? 'selected' : '' }}>Humano</option>
            <option value="alien" {{ request('species') == 'alien' ? 'selected' : '' }}>Alien</option>
        </select>
        <button type="submit">Buscar</button>
    </form>

    <!-- Lista de personajes -->
    <div id="character-grid" class="character-grid">
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
    <div id="load-more-container" class="text-center my-4">
        <button id="load-more" class="btn btn-primary" data-page="1">Ver más</button>
    </div>


    @section('scripts')
<script>
    const loadMoreButton = document.getElementById('load-more');
    const characterGrid = document.getElementById('character-grid');

    // Evento para cargar más personajes
    loadMoreButton.addEventListener('click', function () {
        const nextPage = loadMoreButton.dataset.page;

        if (!nextPage) {
            alert('No hay más personajes para cargar.');
            return;
        }

        fetch(`{{ route('characters.index') }}?page=${nextPage}`, {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los personajes.');
            }
            return response.json();
        })
        .then(data => {
            // Si hay personajes, añádelos al grid
            data.characters.forEach(character => {
                const characterCard = `
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
                characterGrid.insertAdjacentHTML('beforeend', characterCard);
            });

            // Actualiza la página siguiente o deshabilita el botón
            if (data.next) {
                loadMoreButton.dataset.page = data.next;
            } else {
                loadMoreButton.disabled = true;
                loadMoreButton.textContent = 'No hay más personajes';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al cargar los personajes.');
        });
    });
</script>
@endsection



@endsection
