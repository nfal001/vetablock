<?php

namespace App\Http\Controllers;

use App\Models\CurrentTemperature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use App\Models\Device;

class CurrentTemperatureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (count($request->all()) <= 3) {
            if ($request->has('token', 'mac', 'temp')) {
                // validation
                $validator = Validator::make(
                    $request->all(),
                    ['mac' => 'mac_address', 'temp' => 'numeric']
                );
                if (!$validator->fails()) {
                    // spot data
                    if ($spot = Device::where('token', $request->token)->first()) {
                        if ($spot->mac_address === null) {
                            $spot->mac_address = $request->mac;
                            $spot->save();
                            $currentTemp = CurrentTemperature::where('device_id', $spot->id)->first();
                            $currentTemp->temperature = $request->temp;
                            $currentTemp->status = 'online';
                            $currentTemp->save();
                            return response()->json(['status' => 200, "message" => "success", "data-modified" => true]);
                        } elseif ($spot->mac_address == $request->mac) {
                            $currentTemp = CurrentTemperature::where('device_id', $spot->id)->first();
                            $currentTemp->temperature = $request->temp;
                            $currentTemp->status = 'online';
                            $currentTemp->save();
                            return response()->json(['status' => 200, "message" => "success", "data-modified" => true]);
                        }
                        return response()->json(['status' => 401, "message" => "bad credentials"], 401);
                    }
                    return response()->json(['status' => 401, "message" => "bad credentials"], 401);
                }
                return response()->json(['status' => 400, "message" => "bad request"], 400);
            }
            return response()->json(['status' => 400, "message" => "bad request"], 400);
        }
        return response()->json(['status' => 400, "message" => "too many arguments"], 400);
    }
    public function checker(Request $request)
    {
        if (count($request->all()) != 0) {
            if ($request->AxzPOW === 'yzxs') {
                $now = Carbon::now();
                $tobes = CurrentTemperature::all();
                foreach ($tobes as $tobe) {
                    if ($tobe->temperature) {
                        if ($now->diffInSeconds($tobe->updated_at) > 60) {
                            $tobe->temperature = null;
                            $tobe->status = 'offline';
                            $tobe->save();
                        }
                    }
                }
                return '200';
            }
            return '403';
        }
    }
}
