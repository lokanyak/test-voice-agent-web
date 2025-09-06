import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Volume2, Upload } from 'lucide-react';

const voices = {
    sarvam: [
        { id: 'anushka', name: 'Anushka', gender: 'Female', lang: 'Hindi/English' },
        { id: 'arjun', name: 'Arjun', gender: 'Male', lang: 'Hindi/English' },
    ],
    cartesia: [
        { id: 'sonia', name: 'Sonia', gender: 'Female', lang: 'English' },
        { id: 'rahul', name: 'Rahul', gender: 'Male', lang: 'English' },
    ]
}

export function VoiceLab() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Voice Lab</h1>
        <p className="text-muted-foreground">Clone and test different voices to find the perfect one for your brand.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Voice Library</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(voices).map(([provider, voiceList]) => (
                <div key={provider}>
                    <h3 className="font-semibold capitalize mb-2">{provider} Voices</h3>
                    <div className="space-y-2">
                        {voiceList.map(voice => (
                            <Card key={voice.id} className="p-3 flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{voice.name}</p>
                                    <p className="text-xs text-muted-foreground">{voice.gender} - {voice.lang}</p>
                                </div>
                                <Button variant="ghost" size="icon"><Volume2 className="h-5 w-5" /></Button>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Voice Cloning (Enterprise)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <p>Upload at least 5 minutes of audio to clone a voice.</p>
            <Button disabled>Upload Audio</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
