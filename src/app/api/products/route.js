// import connect from "@/lib/mongodb";
// import { TaskModel } from "@/models/schema";

// export async function GET() {
//   await connect();

//   try {
//     const data = await TaskModel.find().select("task").lean();
//     return new Response(JSON.stringify(data));
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ message: "Error fetching data" }));
//   }
// }

// export async function POST(request) {
//   await connect();

//   try {
//     const body = await request.json();
//     const newTask = new TaskModel({ task: body.task });

//     const savedTask = await newTask.save();

//     return new Response(JSON.stringify(savedTask));
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ message: "Error adding task" }));
//   }
// }

import connect from "@/lib/mongodb";
import { TaskModel } from "@/models/schema";

export async function GET() {
  await connect();

  try {
    const data = await TaskModel.find().select("task").lean();
    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error fetching data" }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  await connect();

  try {
    const body = await request.json();
    const newTask = new TaskModel({ task: body.task });

    const savedTask = await newTask.save();

    return new Response(JSON.stringify(savedTask), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error adding task" }), {
      status: 500,
    });
  }
}

export async function DELETE(request) {
  await connect();

  try {
    const { id } = await request.json();

    const deletedTask = await TaskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return new Response(JSON.stringify({ message: "Task not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Task deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error deleting task" }), {
      status: 500,
    });
  }
}
