<?php

namespace App\Http\Controllers;

use App\Models\CurrentTemperature;
use App\Models\Cluster;
use App\Models\Device;
use Illuminate\Http\Request;


class DashboardController extends Controller
{
    public function dashboard()
    {
        $devices = CurrentTemperature::where('user_id', auth()->user()->id);
        $totalDevices = $devices->count();
        $onlineDevices = $devices->where('status', 'online')->count();
        $clusters = Cluster::withCount('devices')->where('user_id', auth()->user()->id);
        $clusterCount = $clusters->count();
        return inertia('Dashboard/Index', ['cluster' => ['clusters' => $clusters->get(), 'total' => $clusterCount], 'devices' => ['total' => $totalDevices, 'active' => $onlineDevices]]);
    }
    public function monitor(Cluster $cluster)
    {
        if (auth()->user()->role === 'user') {
            if ($cluster->user_id != auth()->user()->id) {
                return redirect()->route('user.dashboard');
            }
        }
        // dd($cluster->id);
        $device = Device::with('currentTemperature')->where('cluster_id', $cluster->id)->get();
        return inertia('Dashboard/Monitor', ['data' => ['monitors' => $device, 'cluster_id' => $cluster->id, 'cluster_name' => $cluster->name]]);
    }
}
