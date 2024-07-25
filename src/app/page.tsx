'use client'
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import LoadingSpinner from "@/components/LoadingSpinner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { generateRecipes } from "./actions"

export default function Home() {
  const [ prompt, setPrompt ] = useState<string>("")
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ recipes, setRecipes ] = useState<any[]>([])

  async function onSubmit() {
    setIsLoading(true)
    const r = await generateRecipes(prompt)
    setRecipes(r)
    setIsLoading(false)
  }

  return (
    <main className="p-10">
      <div className="flex flex-col items-center">
        <h1 className="text-xl p-4">Brekky AI</h1>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Input 
          type="text"
          placeholder="Specify some themes or ingredients"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />
        <Button type="submit" onClick={() => onSubmit()}>Generate Ideas!</Button>
      </div>
      {isLoading && <LoadingSpinner />}
      <div className="grid md:grid-cols-3 gap-4">
        {recipes.length > 0 && recipes.map((recipe, i) => (
          <Card className="flex flex-col flex-1">
            <CardHeader>
              <CardTitle>{recipe.name}</CardTitle>
              <CardDescription>{recipe.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <div className="flex flex-col flex-1 mb-2">
                <div>Ingredients:</div>
                <div className="bg-slate-100 border border-slate-200 shadow-sm rounded mb-2">
                  <ul className="text-sm list-disc ml-4 p-2">
                    {recipe.ingredients.map((ingredient: string, i: number) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <ol className="list-decimal ml-4">
                    {recipe.instructions.map((step: string, i: number) => (
                      <li key={i}>{step}</li>
                    ))}
                </ol>
              </div>
              <Button onClick={() => alert("You clicked the button")}>Save</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
