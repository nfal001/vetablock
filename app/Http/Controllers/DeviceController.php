<?php

namespace App\Http\Controllers;

use App\Models\Cluster;
use App\Models\CurrentTemperature;
use App\Models\Device;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class DeviceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        return redirect()->route('cluster.show', $id);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Cluster $cluster)
    {
        if (auth()->user()->role === 'user') {
            if ($cluster->user_id != auth()->user()->id) {
                return redirect()->route('user.dashboard');
            }
        }
        return inertia('Dashboard/Device/Create', ['cluster' => $cluster]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (auth()->user()->role === 'user') {
            if (Cluster::find($request->clusterID)->user_id != auth()->user()->id) {
                return redirect()->route('user.dashboard');
            }
        }
        if ($request->randomName) {
            $device = 'device-' . Str::random(8);
        } else if (!$request->randomName) {
            is_null($request->name) ? $device = 'device-' . Str::random(8) :
                $device = Str::slug($request->name) . '-' . Str::random(6);
        }
        $makeDevice = Device::create(['name' => $device, 'cluster_id' =>
        $request->clusterID, 'token' => Str::random(32)]);
        $currentTemp = CurrentTemperature::create([
            'device_id' => $makeDevice->id,
            'user_id' => auth()->user()->id
        ]);
        return redirect()->route(
            'cluster.show',
            $request->clusterID
        )->with('status', ["success" => true, "message" => "Item Added"]);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Device  $device
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $deviceToken = Device::where('id', $id)->get('token')
            ->first()->makeVisible('token');
        return "use this key for your device measurer : "
            . $deviceToken->token;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Device  $device
     * @return \Illuminate\Http\Response
     */
    public function edit(Cluster $cluster, Device $device)
    {
        if (auth()->user()->role === 'user') {
            if ($cluster->user_id != auth()->user()->id) {
                return redirect()->route('user.dashboard');
            }
        }
        return inertia('Dashboard/Device/Edit', ['data' => [
            'cluster_id'
            => $cluster->id, 'device' => $device, 'device_id' => $device->id
        ]]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Device  $device
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cluster $cluster, Device $device)
    {
        if (auth()->user()->role === 'user') {
            if ($cluster->user_id != auth()->user()->id) {
                return redirect()->route('user.dashboard');
            }
        }
        if ($device->name !== Str::slug($request->name)) :

            $deviceChanges = Str::slug($request->name . '-' . Str::random(4));

            if (Str::length($deviceChanges) > 48) :
                return redirect()->route('device.edit', [
                    'cluster' => $cluster->id, 'device' => $device->id
                ])->with(
                    'status',
                    ["success" => false, "message" => "Name length Must Below 48 char"]
                );
            endif;

            $device->update(['name' => $deviceChanges]);
        endif;

        return redirect()->route('cluster.show', $cluster->id)->with([
            'status', ["success" => true, "message" => "Item Updated"]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Device  $device
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cluster $cluster, Device $device)
    {
        if (auth()->user()->role === 'user') {
            if ($cluster->user_id != auth()->user()->id) {
                return redirect()->route('user.dashboard');
            }
        }
        $device->currentTemperature()->delete();
        $device->delete();
        return redirect()->route('cluster.show', $cluster->id)->with([
            'status',
            ["success" => true, "message" => "Item Deleted"]
        ]);
    }
}
