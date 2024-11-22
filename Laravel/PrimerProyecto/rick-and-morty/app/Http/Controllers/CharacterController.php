<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class CharacterController extends Controller
{
    public function index(Request $request){

        //Crear un cliente HTTP
        $client = new Client();

        //Preparar la solicitud GET
        $response = $client->get('https://rickandmortyapi.com/api/character',['query' => $request->only('name', 'status', 'species', 'page')]);

        //Decodificar la respuesta JSON
        $data = json_decode($response->getBody(),true);

        $characters = $data['results'];
        $info = $data['info'];      //informacion de paginacion


        if($request->ajax()){
            return response()->json([
                'characters' => $characters,
                'info' => $info
            ]);
        }

        //Retornar los datos
        return view('characters.index', compact('characters', 'info'));

    }


    public function search(Request $request){
         //Crear un cliente HTTP
         $client = new Client();

         //Preparar la solicitud GET
         $response = $client->get('https://rickandmortyapi.com/api/character',['query' => ['name' => $request->query('name')] ]);

        $data = json_decode($response->getBody(), true);

        //devolver los resultados
        return response()->json($data);
    }


}
