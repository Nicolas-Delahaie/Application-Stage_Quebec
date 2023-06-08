<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/**
 * Noms des routes :
 * - snake case
 * - _detaille lorsque les cles etrangeres sont developpees
 * - _attribut lorsqu un attribut est developpe
 */


/* -------------------------------------------------------------------------- */
/*                                DEPARTEMENT                                 */
/* -------------------------------------------------------------------------- */
use App\HTTP\Controllers\DepartementController;

Route::get('/departements', [DepartementController::class, 'index'])->middleware(['tokenBon', 'responsable']);
Route::get('/departements_detailles', [DepartementController::class, 'indexDetaille'])->middleware(['tokenBon', 'responsable']);
Route::get('/departements_enseignants', [DepartementController::class, 'indexWithEnseignants'])->middleware(['tokenBon', 'responsable']);
Route::get('/departements/{id}', [DepartementController::class, 'show'])->middleware(['tokenBon', 'responsable']);
Route::get('/departements/{id}/coordonnateur', [DepartementController::class, 'showCoordonnateur'])->middleware(['tokenBon', 'responsable']);
Route::get('/departements/{id}/cours_proposes_detailles', [DepartementController::class, 'showCoursProposesDetailles'])->middleware(['tokenBon', 'responsable']);
// Route::get('/departements/{id}/cours_proposes', [DepartementController::class, 'showCoursProposes'])->middleware(['tokenBon', 'responsable']);
// Route::get('/departements/{id}/scenarios', [DepartementController::class, 'showScenarios'])->middleware(['tokenBon', 'responsable']);


/* -------------------------------------------------------------------------- */
/*                                    USERS                                   */
/* -------------------------------------------------------------------------- */
use App\Http\Controllers\UserController;

Route::get('/users', [UserController::class, 'index'])->middleware(['tokenBon', 'responsable']);
Route::get('/users/responsables', [UserController::class, 'indexResponsables'])->middleware(['tokenBon', 'responsable']);
Route::get('/user/detaille', [UserController::class, 'showUserDetails'])->middleware(['tokenBon']);
Route::get('/user/departement/scenarios_detailles', [UserController::class, 'showDepartementScenariosDetailles'])->middleware('tokenBon');
Route::put('/user/contraintes', [UserController::class, 'updateUserContraintes'])->middleware('tokenBon');
Route::get('/users/{id}/liberations', [UserController::class, 'showLiberations'])->middleware(['tokenBon', 'responsable']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout'])->middleware('tokenBon');
// Route::get('/users/{id}', [UserController::class,'show'])->middleware('tokenBon');
// Route::get('/users/{id}/type', [UserController::class,'showType'])->middleware('tokenBon');
// Route::get('/users/{id}/liberations', [UserController::class,'showLiberations'])->middleware('tokenBon');
// Route::get('/users/{id}/modifications', [UserController::class,'showModifications'])->middleware('tokenBon');
// Route::get('/users/{id}/cours', [UserController::class,'showCours'])->middleware('tokenBon');
// Route::get('/users/{id}/scenarios', [UserController::class,'showScenarios'])->middleware('tokenBon');


/* -------------------------------------------------------------------------- */
/*                               COURS PROPOSE                                */
/* -------------------------------------------------------------------------- */
use App\Http\Controllers\CoursProposeController;

Route::delete('/cours_proposes/{id}', [CoursProposeController::class, 'delete'])->middleware(['tokenBon']);
Route::put('/cours_proposes/{id}', [CoursProposeController::class, 'update'])->middleware(['tokenBon']);
// Route::get('/cours_proposes/{id}/cours', [CoursProposeController::class, 'showCours'])->middleware(['tokenBon', 'responsable']);
// Route::get('/cours_proposes/{id}/departement', [CoursProposeController::class, 'showDepartement'])->middleware(['tokenBon', 'responsable']);
// Route::get('/cours_proposes/{id}/enseignants', [CoursProposeController::class, 'showEnseignants'])->middleware(['tokenBon', 'responsable']);


/* -------------------------------------------------------------------------- */
/*                                  ENSEIGNER                                 */
/* -------------------------------------------------------------------------- */
use App\Http\Controllers\EnseignerController;
use App\Http\Controllers\RepartitionController;

Route::post('/enseigner', [EnseignerController::class, 'store'])->middleware(['tokenBon', 'responsable']);
Route::delete('/enseigner', [EnseignerController::class, 'delete'])->middleware(['tokenBon', 'responsable']);


/* -------------------------------------------------------------------------- */
/*                                  SCÉNARIOS                                 */
/* -------------------------------------------------------------------------- */
use App\Http\Controllers\ScenarioController;

Route::get('scenarios_detailles', [ScenarioController::class, 'indexDetaille'])->middleware(['tokenBon', 'responsable']);
Route::get('scenarios/{id}/detaille', [ScenarioController::class, 'showDetails'])->middleware('tokenBon');
Route::get('scenarios/{id}/modifications', [ScenarioController::class, 'showModifications'])->middleware('tokenBon');
Route::get('scenarios/{id}/repartition', [ScenarioController::class, 'showRepartition'])->middleware('tokenBon');
Route::get('scenarios/{id}/professeurs', [ScenarioController::class, 'showProfesseurs'])->middleware('tokenBon');
// Route::get('scenarios', [ScenarioController::class, 'index'])->middleware('tokenBon');
// Route::get('scenarios/{id}', [ScenarioController::class, 'show'])->middleware('tokenBon');
// Route::get('scenarios/{id}/departement', [ScenarioController::class, 'showDepartement'])->middleware('tokenBon');
// Route::get('scenarios/{id}/proprietaire', [ScenarioController::class, 'showProprietaire'])->middleware('tokenBon');
// Route::get('scenarios/{id}/rdvs', [ScenarioController::class, 'showRDVs'])->middleware('tokenBon');

/* -------------------------------------------------------------------------- */
/*                                 REPARTTION                                 */
/* -------------------------------------------------------------------------- */
Route::post('repartition/{id}', [RepartitionController::class, 'update'])->middleware(['tokenBon', 'responsable']);
Route::delete('repartition/{id}', [RepartitionController::class, 'delete'])->middleware(['tokenBon', 'responsable']);


/* -------------------------------------------------------------------------- */
/*                                    COURS                                   */
/* -------------------------------------------------------------------------- */
use App\HTTP\Controllers\CoursController;
// Route::get('/cours', [CoursController::class, 'index'])->middleware(['tokenBon', 'responsable']);
// Route::get('/cours/{id}', [CoursController::class, 'show'])->middleware(['tokenBon', 'responsable']);
// Route::get('/cours/{id}/departements', [CoursController::class, 'showDepartements'])->middleware(['tokenBon', 'responsable']);


/* -------------------------------------------------------------------------- */
/*                                LIBERATION                                  */
/* -------------------------------------------------------------------------- */
use App\HTTP\Controllers\LiberationController;
// Route::get('/liberations', [LiberationController::class, 'index'])->middleware(['tokenBon', 'responsable']);
// Route::get('/liberations/{id}', [LiberationController::class, 'show'])->middleware(['tokenBon', 'responsable']);
// Route::get('/liberations/{id}/users', [LiberationController::class, 'showUsers'])->middleware(['tokenBon', 'responsable']);


/* -------------------------------------------------------------------------- */
/*                                MODIFICATION                                */
/* -------------------------------------------------------------------------- */
use App\HTTP\Controllers\ModificationController;
// Route::get('modifications', [ModificationController::class, 'index'])->middleware('tokenBon');
// Route::get('modifications/{id}', [ModificationController::class, 'show'])->middleware('tokenBon');
// Route::get('modifications/{id}/user', [ModificationController::class, 'showUser'])->middleware('tokenBon');
// Route::get('modifications/{id}/scenario', [ModificationController::class, 'showScenario'])->middleware('tokenBon');
// Route::get('modifications/{id}/details', [ModificationController::class, 'showDetails'])->middleware('tokenBon');


/* -------------------------------------------------------------------------- */
/*                                     RDV                                    */
/* -------------------------------------------------------------------------- */
use App\HTTP\Controllers\RDVController;
// Route::get('rdvs', [RDVController::class, 'index'])->middleware(['tokenBon', 'responsable']);
// Route::get('rdvs/{id}', [RDVController::class, 'show'])->middleware(['tokenBon', 'responsable']);
// Route::get('rdvs/{id}/scenario', [RDVController::class, 'showScenario'])->middleware(['tokenBon', 'responsable']);


/* -------------------------------------------------------------------------- */
/*                              TYPE_UTILISATEUR                              */
/* -------------------------------------------------------------------------- */
use App\Http\Controllers\TypeUtilisateurController;

// Route::get('/types_utilisateur', [TypeUtilisateurController::class, 'index'])->middleware(['tokenBon', 'responsable']);
// Route::get('/types_utilisateur/{id}', [TypeUtilisateurController::class, 'show'])->middleware(['tokenBon', 'responsable']);
// Route::get('/types_utilisateur/{id}/users', [TypeUtilisateurController::class, 'showUsers'])->middleware(['tokenBon', 'responsable']);
