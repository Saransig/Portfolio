<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class CharacterController extends Controller
{
    public function index(Request $request){

        $client = new Client();

        try {
            $response = $client->get('https://rickandmortyapi.com/api/character', [
                'query' => $request->only('name', 'status', 'species', 'page')
            ]);

            $data = json_decode($response->getBody(), true);

            $characters = $data['results'] ?? [];
            $info = $data['info'] ?? ['pages' => 1, 'prev' => null, 'next' => null];
            $info['current'] = $request->get('page', 1); // Página actual

            if ($request->ajax()) {
                return response()->json([
                    'characters' => $characters,
                    'info' => $info,
                ]);
            }

            return view('characters.index', compact('characters', 'info'));
        } catch (\Exception $e) {
            $characters = [];
            $info = ['pages' => 1, 'prev' => null, 'next' => null, 'current' => 1];
            if ($request->ajax()) {
                return response()->json(['error' => 'Error al obtener datos: ' . $e->getMessage()], 500);
            }
            return view('characters.index', compact('characters', 'info'));
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
