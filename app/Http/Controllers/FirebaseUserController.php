use Illuminate\Http\Request;
use Kreait\Firebase\Factory;

public function updateUser(Request $request)
{
    $uid = $request->input('uid');
    $name = $request->input('name');
    $email = $request->input('email');
    $role = $request->input('role');

    if (!$uid || !$email || !$name) {
        return response()->json(['error' => 'Missing data'], 400);
    }

    try {
        $factory = (new Factory)->withServiceAccount(storage_path('app/firebase/firebase_credentials.json'));
        $auth = $factory->createAuth();
        $database = $factory->createDatabase();

        // Update Firebase Authentication
        $auth->updateUser($uid, [
            'displayName' => $name,
            'email' => $email,
        ]);

        // Update Realtime Database
        $database->getReference("users/{$uid}")->update([
            'name' => $name,
            'email' => $email,
            'role' => $role,
        ]);

        return response()->json(['message' => 'User updated successfully.']);
    } catch (\Throwable $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
