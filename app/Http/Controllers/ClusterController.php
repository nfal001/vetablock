<?php

namespace App\Http\Controllers;

use App\Models\Cluster;
use Illuminate\Http\Request;
use App\Models\Device;
use Illuminate\Support\Facades\Redirect;

class ClusterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cluster = Cluster::withCount('devices')->where(
            'user_id',
            auth()->user()->id
        )->get();
        return inertia(
            'Dashboard/Cluster/Cluster',
            ['cluster' => $cluster]
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Dashboard/Cluster/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate(['name' => 'required|min:3|max:1000']);
        $note = 'some note';
        $user_id = auth()->user()->id;
        Cluster::create([
            'name' => $request->name, 'note' => $note,
            'user_id' => $user_id
        ]);
        return redirect()->route('cluster.index')->with(
            'status',
            ["success" => true, "message" => "Item Added"]
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cluster  $cluster
     * @return \Illuminate\Http\Response
     */
    public function show(Cluster $cluster)
    {
        if (auth()->user()->role === 'user') {
            if ($cluster->user_id != auth()->user()->id) {
                return redirect()->route('user.dashboard');
            }
        }
        $devices = Device::with('currentTemperature')
            ->where('cluster_id', $cluster->id)->get()->toArray();
        $clusterName = $cluster->name;
        return inertia(
            'Dashboard/Device/Device',
            ['data' => ['cluster_name' => $clusterName, 'devices' => $devices]]
        );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cluster  $cluster
     * @return \Illuminate\Http\Response
     */
    public function edit(Cluster $cluster)
    {
        if (auth()->user()->role === 'user') {
            if ($cluster->user_id != auth()->user()->id) {
                return redirect()->route('user.dashboard');
            }
        }
        return inertia('Dashboard/Cluster/Edit', ['cluster' => $cluster]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cluster  $cluster
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cluster $cluster)
    {
        if (auth()->user()->role === 'user') {
            if ($cluster->user_id != auth()->user()->id) {
                return redirect()->route('user.dashboard');
            }
        }
        $request->validate(['name' => 'required|min:3|max:100']);
        $cluster->update(['name' => $request->name]);
        return redirect()->route('cluster.index')->with(
            'status',
            ["success" => true, "message" => "Updated"]
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cluster  $cluster
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cluster $cluster)
    {
        if (auth()->user()->role === 'user') {
            if ($cluster->user_id != auth()->user()->id) {
                return redirect()->route('user.dashboard');
            }
        }
        $dev = Cluster::find($cluster->id)->devices();
        $dev->each(fn ($e) => $e->currentTemperature()->delete());
        $dev->delete();
        $cluster->devices()->delete();
        $cluster->delete();
        return Redirect::back()->with('status', [
            "success" => true,
            "message" => "Item Deleted"
        ]);
    }
}
