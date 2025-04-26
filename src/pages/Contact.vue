<template>
  <section class="bg-white py-16 px-6 md:px-20 text-textMain">
    <h2 class="text-3xl font-bold mb-6 text-primary">Contact</h2>
    <form @submit.prevent class="space-y-4 max-w-lg">
      <div>
        <label class="block text-sm font-medium">Name</label>
        <input type="text" class="w-full mt-1 p-2 border rounded bg-background" />
      </div>
      <div>
        <label class="block text-sm font-medium">Email</label>
        <input type="email" class="w-full mt-1 p-2 border rounded bg-background" />
      </div>
      <div>
        <label class="block text-sm font-medium">Message</label>
        <textarea rows="5" class="w-full mt-1 p-2 border rounded bg-background"></textarea>
      </div>
      <button type="submit" class="bg-primary text-white  rounded hover:bg-blue-600">
        Send
      </button>
    </form>
  </section>
</template>
