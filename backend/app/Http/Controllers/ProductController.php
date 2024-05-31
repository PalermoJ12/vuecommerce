<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::orderBy('updated_at', 'desc')->get();

        return response(["products" => $products], 200);
    }



    public function store(Request $request)
    {

        Log::info('request', $request->all());
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|integer',
            'quantity' => 'required|integer',
            'category' => 'required|string',

        ]);

        $product = Product::create($request->all());

        return response([
            "product" => $product,
            "message" => "Product created successfully",
        ], 201);
    }

    public function update(Request $request, $id)
    {
        try {

            Log::info('Updating product: ' . $id);

            $request->validate([
                'name' => 'required|string',
                'description' => 'required|string',
                'price' => 'required|numeric',
                'quantity' => 'required|integer',
                'category' => 'required|string',
            ]);


            $product = Product::findOrFail($id);


            $product->update($request->all());


            Log::info('Updated product details: ' . $product);


            return response([
                "product" => $product,
                "message" => "Product updated successfully",
            ], 200);
        } catch (\Exception $e) {

            Log::error('Error updating product: ' . $e->getMessage());


            return response(["message" => "Something went wrong"], 500);
        }
    }


    public function destroy($id)
    {

        $product = Product::find($id);
        $product->delete();
        return response([
            "message" => "Product deleted successfully",
        ], 204);
    }
}
