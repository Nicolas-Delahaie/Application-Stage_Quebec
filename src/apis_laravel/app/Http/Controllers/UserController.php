<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; /** @todo retirer ça */


class UserController extends Controller
{
    public function index(){
        return User::all();
    }

    public function show($id){
        return User::findOrFail($id);
    }
    public function showType($id){
        return User::findOrFail($id)->type->toJson();
    }
    public function showLiberations($id){
        return User::findOrFail($id)->liberations->toJson();
    }
    public function showModifications($id){
        return User::findOrFail($id)->modifications->toJson();
    }
    public function showCours($id){
        return User::findOrFail($id)->cours->toJson();
    }
    public function showScenarios($id){
        return User::findOrFail($id)->scenarios->toJson();
    }

    /**
     * Create User
     * @param Request $request
     * @return User 
     */
    public function store(Request $request)
    {
        try {
            //Validated
            $validateUser = Validator::make($request->all(), 
            [
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required'
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User Created Successfully',
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Login The User
     * @param Request $request
     * @return User
     */
    public function login(Request $request)
    {
        try {
            // -- Validation des parametres --
            $validateUser = Validator::make($request->all(), 
            [
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if($validateUser->fails()){
                // Log::info($validateUser->errors());
                return response()->json([
                    // 'status' => false,
                    // 'message' => 'Mauvais format de reponse',
                    // 'errors' => $validateUser->errors()
                ], 422);
            }

            
            // -- Verification des identifiants --
            $user = User::where('email', $request->email)->first();
            if(!$user || !Hash::check($request->password, $user->password)){
                // Mauvais identifiants
                return response()->json([
                    // 'status' => false,
                    // 'message' => 'Mauvais identifiants',
                ], 401);
            }
            else{
                // Identifiants bons
                $token = $user->createToken("userToken");   //Fabrication du token
                /** @todo Supprimer api_token qui est une copie de personal_access_token */
                $user->api_token = $token->plainTextToken;  //On met le jeton genere dans personnal_access_tokens dans api_token de l utilisateur
                $user->save();
                return response()->json([
                    'status' => true,
                    'token' => $token
                ], 200);
            }


        } catch (\Throwable $th) {
            return response()->json([
                // 'status' => false,
                // 'message' => "Erreur de serveur",
                // 'error' => $th->getMessage()
            ], 500);
        }
    }


}

