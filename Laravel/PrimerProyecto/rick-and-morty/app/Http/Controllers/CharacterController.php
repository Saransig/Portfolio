<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class CharacterController extends Controller
{
    public function index(Request $request){
        $client = new Client();

        try {
            // Determina la página actual a cargar
            $currentPage = $request->get('page', 1);
            $quantity = 9;

            // Llama a la API con la página actual
            $response = $client->get('https://rickandmortyapi.com/api/character', [
                'query' => ['page' => $currentPage],
            ]);

            $data = json_decode($response->getBody(), true);

            // Extrae los personajes y la información de paginación
            $characters = array_slice($data['results'] ?? [], 0, $quantity);
            $info = $data['info'] ?? ['next' => null];

            // Si es una solicitud AJAX, devuelve JSON
            if ($request->ajax()) {
                return response()->json([
                    'characters' => $characters,
                    'next' => $info['next'] ? $currentPage + 1 : null,
                ]);
            }

            // Si no es AJAX, devuelve la vista
            return view('characters.index', compact('characters'));
        } catch (\Exception $e) {
            // En caso de error, maneja la excepción
            $characters = [];
            $error = 'Error al obtener los personajes: ' . $e->getMessage();

            // Si es AJAX, devuelve el error en formato JSON
            if ($request->ajax()) {
                return response()->json(['error' => $error], 500);
            }

            // Solicitudes normales, carga la vista con el error
            return view('characters.index', compact('characters'))->withErrors($error);
        }
    }



    public function search(Request $request)
    {
        //Crear un cliente HTTP
        $client = new Client();

        //Preparar la solicitud GET
        $response = $client->get('https://rickandmortyapi.com/api/character', ['query' => ['name' => $request->query('name')]]);

        $data = json_decode($response->getBody(), true);

        //devolver los resultados
        return response()->json($data);
    }
}
