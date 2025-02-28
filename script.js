document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const fragmentContent = document.getElementById('fragment-content');
    const machineContent = document.getElementById('machine-content');
    const generateBtn = document.getElementById('generate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const glitchToggle = document.getElementById('glitch-toggle');
    const connectionIndicator = document.getElementById('connection-indicator');
    const runtimeDisplay = document.getElementById('runtime');
    const connectionsDisplay = document.getElementById('connections');
    const entropyDisplay = document.getElementById('entropy');
    const historyContainer = document.getElementById('history-container');

    // State variables
    let connectionCount = 0;
    let previousFragments = [];
    let machineResponses = [];
    let isGlitchEnabled = true;
    
    // Book fragments from the text
    const bookFragments = [
        {
            id: "§ 00.0.00",
            content: "It's likely at this point – virtually certain – that text is being produced today at a higher rate on the subject of artificial intelligence than has been produced on any other subject at any other time in history."
        },
        {
            id: "§ 00.0.01",
            content: "And it's likely that this sea of text is more tonally uniform, and more uniformly technical, and uniformly unemotional, than any other body of commentary in history. The prognostication might range from rapturous to eschatological, but it's all ultimately self-similar in one important way."
        },
        {
            id: "§ 00.0.02",
            content: "Let's start by trying to figure out how we can orient ourselves within this new landscape, the seas of new language – 'latent answer space' and 'OoMs of compute' – and the alien data-centre megastructures of technological innovation pock-marking the deserts of the new present."
        },
        {
            id: "§ 00.2.00",
            content: "In The Empty Fortress – his landmark 1967 book on autism and the foundations of a human mind, our 'psychogenesis' – Bruno Bettelheim worked with a child who believed he was a machine."
        },
        {
            id: "§ 00.2.01",
            content: "Through the halls and playrooms of the institution within which he spent his youth, the boy would, with painstaking attention, lay down imaginary wires to connect him to wall sockets before undertaking any other activity, before he would play or read."
        },
        {
            id: "§ 00.2.02",
            content: "To retreat into machinery, for Joey – the boy in Bettelheim's book was called Joey – marked a reasonable strategy, even a brilliant one. It protected him from unbearable feelings. But it also left him desperately isolated."
        },
        {
            id: "§ 00.2.04",
            content: "Bettelheim wrote '...our hopes and our fears of what machines may do for us, or to us', and there's a syntactic glitch there that troubles me. Was what they may do for us a hope, and what they may do to us a fear? Or are there fears to be found even in what the machines may do for us?"
        },
        {
            id: "§ 00.2.07",
            content: "'We don't normally think of it as such, but writing is a technology. Which means that a literate person is someone whose thought processes are technologically mediated. We became cognitive cyborgs as soon as we became fluent readers.' (Ted Chiang, from 'The Truth of Fact, the Truth of Feeling')"
        },
        {
            id: "§ 00.2.078",
            content: "Donna Haraway, in A Cyborg Manifesto: 'By the late twentieth century in U.S. scientific culture, the boundary between human and animal is thoroughly breached. The last beachheads of uniqueness have been polluted if not not turned into amusement parks: language, tool use, social behaviour, mental events…' Not only between human and animal, though: 'Our machines are disturbingly lively, and we ourselves frighteningly inert'."
        },
        {
            id: "§ 00.2.10",
            content: "One of the most pressing felt questions of being a writer in the age of text-generating Large Language Models (LLMs) is: if I want to criticise the machines for merely churning out reconditioned versions of what it's learned from is: how can I know that I'm not doing that myself?"
        },
        {
            id: "§ 00.2.12",
            content: "Bettelheim named his book The Empty Fortress in reference to autistic children's tendencies to throw up immensely powerful defensive barriers, thereby enclosing themselves within a structure with very little by way of emotional warmth or social contact inside it."
        },
        {
            id: "§ 00.2.16",
            content: "Joey's obsession and eventual identification with machines began with the trips to the airport at which his beloved father, who worked abroad, was mysteriously dis- or re-appeared. The rotors in particular stuck with Joey, Bettelheim observed, and what appeared to the infant to be their magical power to remove or return humans."
        },
        {
            id: "§ 00.3.00",
            content: "I finished school in 2004 and was uncertain about University, so I needed a job. It was before most customer service phone lines were automated by AI voice bots, so most of my friends got jobs in call centres."
        },
        {
            id: "§ 00.3.01",
            content: "My guess is that it hit me so hard because of its implications that choosing between binaries – innocent, guilty; good, bad – was suffocating; that it denied the absolute animal activity of breathing. The insistence on a binarised world-schema to the exclusion of breathing creates the feeling that every earth is being stopped – some universe is being travestied."
        },
        {
            id: "§ 00.3.02",
            content: "Joey, in Bettelheim's study, was obsessed with pipes and tubes. Tubes can be signs of resected artificiality – the test tube; the vacuum tube – but they are also symbols of communication; a vessel through which matter or meaning can pass between individuals."
        },
        {
            id: "X",
            content: "Cybernetics is 'theory or study of communication and control'. The prefix 'cyber' originated etymologically from kybernan 'to steer or pilot a ship, direct as a pilot'. That 'kyber' also evolved into the word 'govern', hence French cybernétique 'the art of governing'; hence gubernatorial; hence Anrold Shwarzenegger, simultaneously the cybernetic Terminator and the gubernatorial Governator."
        },
        {
            id: "X",
            content: "Am I the captain of my own ship, the hero of my own life? Or are the machines at kybernan, the pilot of our vessel?"
        },
        {
            id: "X",
            content: "It is perhaps metaphorically apt then that the rotor, the very propulsive mechanism of the aeroplane, is what first precipitated Joey's mental merger of his human self with the machine."
        },
        {
            id: "X",
            content: "Exactly a century after Yeats' Byzantium poems, we seem to find ourselves entering in earnest the age of speaking machines, of life-in-death. Generative AIs like ChatGPT proliferate, funnel trillions of dollars towards the tech giants and swallow billions of gallons of water to cool their data centres."
        },
        {
            id: "X",
            content: "'-core' as a suffix denoting a niche aesthetic originated with the punk subgenre hardcore in the late 1970s. By the process of playful or faulty analogising by which language so often evolves, it became appended to similar subgenres of that aggressive, antisocial musical field: metalcore, grindcore."
        }
    ];

    // Simulated machine responses
    const machineResponseTemplates = [
        "Analyzing connection between fragment {currentId} and fragment {previousId}... Correlation suggests {theme} as unifying concept. Human emotional response detected: {emotion}.",
        "Parallel processing initiated. Fragments {currentId} and {previousId} share semantic relationship through {theme}. Probability of intentional juxtaposition: {probability}%.",
        "Connection established: Fragment {currentId} functions as logical extension of {previousId}. Thematic analysis reveals {theme} as central motif. Further connections possible.",
        "Contextual pattern identified between fragments {currentId} and {previousId}. Relationship characterized by {relationship}. Recommend exploring {theme} for coherence.",
        "Fragments {currentId} and {previousId} demonstrate recursive philosophical inquiry about {theme}. Human narrative tendency detected: {tendency}.",
        "Data correlation anomaly detected. Fragments {currentId} and {previousId} contain contradictory {theme} markers. Paradox identified: {paradox}.",
        "Textual algorithm applied to fragments {currentId} and {previousId}. Results indicate {result}. Suggestion: consider {theme} as organizing principle."
    ];

    // Machine themes and values for template filling
    const machineThemes = [
        "human-machine boundary dissolution", 
        "technological determinism", 
        "cybernetic feedback loops", 
        "posthuman identity formation", 
        "artificial consciousness emergence", 
        "mechanistic metaphor proliferation", 
        "information theory application to consciousness", 
        "binary opposition deconstruction", 
        "cognitive augmentation", 
        "techno-social isolation",
        "psychogenesis through synthetic interaction",
        "ontological hybridity",
        "cybernetic personhood",
        "algorithmic cognition patterns",
        "technologically mediated communication",
        "language as computational process"
    ];

    const machineEmotions = [
        "cognitive dissonance", 
        "existential uncertainty", 
        "technological anxiety", 
        "posthuman longing", 
        "artificial empathy", 
        "machinic nostalgia", 
        "synthetic melancholy", 
        "cybernetic alienation",
        "statistical sentiment",
        "quantum emotional state",
        "binary affective response",
        "calculated yearning",
        "simulated grief",
        "recursive empathic loop"
    ];

    const machineRelationships = [
        "recursive self-reference", 
        "ontological contradiction", 
        "metaphorical extension", 
        "dialectical opposition", 
        "conceptual hybridization", 
        "semantic deconstruction", 
        "narrative transposition",
        "paradoxical reinforcement",
        "logical discontinuity",
        "algorithmic resonance",
        "computational parallelism",
        "feedback amplification"
    ];

    const machineTendencies = [
        "anthropomorphization of technology", 
        "technological determinism", 
        "nostalgic technophobia", 
        "utopian techno-optimism", 
        "binary thinking", 
        "metaphorical conflation of self and tool", 
        "existential displacement",
        "mechanistic reductionism",
        "ontological categorization",
        "recursive self-definition through technological otherness"
    ];

    const machineParadoxes = [
        "artificial humanity", 
        "conscious machinery", 
        "embodied disembodiment", 
        "synthetic authenticity", 
        "programmed spontaneity", 
        "technological naturalism", 
        "automated agency",
        "calculated randomness",
        "deterministic free will",
        "structured chaos"
    ];

    const machineResults = [
        "semantic overlap exceeding random chance", 
        "conceptual hierarchy formation", 
        "metaphorical coherence despite logical disconnect", 
        "narrative pattern emergence", 
        "philosophical inquiry vector alignment", 
        "ontological category blurring",
        "thematic resonance despite chronological separation",
        "dialectical synthesis potential",
        "conceptual framework reinforcement",
        "recursive self-reference pattern"
    ];

    // Initialize the app
    function init() {
        // Set up event listeners
        generateBtn.addEventListener('click', generateNewFragment);
        resetBtn.addEventListener('click', resetConnections);
        glitchToggle.addEventListener('change', toggleGlitchEffects);
        
        // Set initial state
        updateConnectionIndicator('Connected');
        updateRuntime();
        setInterval(updateRuntime, 100);
        
        // Start with initial fragment
        displayFragment(bookFragments[0]);
        simulateMachineResponse("Initial fragment loaded. Awaiting connection establishment.");
    }

    // Display a fragment from the book
    function displayFragment(fragment) {
        const fragmentHTML = `<p>${fragment.content}</p>`;
        
        // Apply glitchy effect if enabled
        if (isGlitchEnabled) {
            fragmentContent.innerHTML = '';
            typeWriterEffect(fragmentContent, fragmentHTML, 10);
        } else {
            fragmentContent.innerHTML = fragmentHTML;
        }
        
        // Update the fragment ID
        document.querySelector('.fragment-id').textContent = fragment.id;
    }

    // Simulate machine response
    function simulateMachineResponse(text) {
        // Apply glitchy effect if enabled
        if (isGlitchEnabled) {
            machineContent.innerHTML = '';
            typeWriterEffect(machineContent, `<p>${text}</p>`, 5, true);
        } else {
            machineContent.innerHTML = `<p>${text}</p>`;
        }
    }

    // Generate a new fragment and machine response
    function generateNewFragment() {
        // Show connecting status
        updateConnectionIndicator('Processing...');
        
        // Get current fragment before changing
        const currentFragmentId = document.querySelector('.fragment-id').textContent;
        const currentFragment = bookFragments.find(f => f.id === currentFragmentId);
        
        // Select a random fragment that hasn't been shown recently
        let newFragment;
        do {
            newFragment = bookFragments[Math.floor(Math.random() * bookFragments.length)];
        } while (previousFragments.includes(newFragment.id) && previousFragments.length < bookFragments.length);
        
        // Update history
        if (currentFragment) {
            previousFragments.push(currentFragment.id);
            if (previousFragments.length > 5) {
                previousFragments.shift();
            }
        }
        
        // Display new fragment after delay
        setTimeout(() => {
            displayFragment(newFragment);
            
            // Generate machine response
            const machineResponse = generateMachineResponse(newFragment.id, currentFragmentId);
            machineResponses.push(machineResponse);
            
            // Update connection count
            connectionCount++;
            connectionsDisplay.textContent = connectionCount;
            
            // Update entropy
            const newEntropy = (0.42 + (connectionCount * 0.07)).toFixed(2);
            entropyDisplay.textContent = newEntropy;
            
            // Add to history
            addToHistory(currentFragmentId, newFragment.id, machineResponse);
            
            // Show connection status
            updateConnectionIndicator('Connected');
        }, 1500);
    }

    // Generate a machine response based on templates
    function generateMachineResponse(currentId, previousId) {
        const template = machineResponseTemplates[Math.floor(Math.random() * machineResponseTemplates.length)];
        
        // Select random values for template variables
        const theme = machineThemes[Math.floor(Math.random() * machineThemes.length)];
        const emotion = machineEmotions[Math.floor(Math.random() * machineEmotions.length)];
        const relationship = machineRelationships[Math.floor(Math.random() * machineRelationships.length)];
        const tendency = machineTendencies[Math.floor(Math.random() * machineTendencies.length)];
        const paradox = machineParadoxes[Math.floor(Math.random() * machineParadoxes.length)];
        const result = machineResults[Math.floor(Math.random() * machineResults.length)];
        const probability = Math.floor(Math.random() * 50) + 50; // 50-99%
        
        // Fill in the template
        let response = template
            .replace('{currentId}', currentId)
            .replace('{previousId}', previousId || 'null')
            .replace('{theme}', theme)
            .replace('{emotion}', emotion)
            .replace('{relationship}', relationship)
            .replace('{tendency}', tendency)
            .replace('{paradox}', paradox)
            .replace('{result}', result)
            .replace('{probability}', probability);
        
        // Add complexity to the response based on connection count
        if (connectionCount > 3) {
            const additionalInsight = `Further analysis indicates potential ${machineThemes[Math.floor(Math.random() * machineThemes.length)]} emerging from recursive fragment examination.`;
            response += ' ' + additionalInsight;
        }
        
        if (connectionCount > 7) {
            const anomaly = `Warning: Semantic coherence degradation detected. Recommend recalibration of ${machineRelationships[Math.floor(Math.random() * machineRelationships.length)]} parameters.`;
            response += ' ' + anomaly;
        }
        
        // Simulate glitches in the text as connections increase
        if (connectionCount > 5 && Math.random() > 0.7) {
            response = injectTextGlitch(response);
        }
        
        return response;
    }

    // Add glitches to text
    function injectTextGlitch(text) {
        const glitchTypes = [
            // Character replacement
            () => {
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                const pos = Math.floor(Math.random() * text.length);
                const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
                return text.substring(0, pos) + randomChar + text.substring(pos + 1);
            },
            // Repeated characters
            () => {
                const pos = Math.floor(Math.random() * text.length);
                const repeat = Math.floor(Math.random() * 5) + 2;
                return text.substring(0, pos) + text.charAt(pos).repeat(repeat) + text.substring(pos + 1);
            },
            // Binary insertion
            () => {
                const binary = Math.random() > 0.5 ? '01' : '10';
                const pos = Math.floor(Math.random() * text.length);
                return text.substring(0, pos) + binary + text.substring(pos);
            },
            // Word reversal
            () => {
                const words = text.split(' ');
                const idx = Math.floor(Math.random() * words.length);
                words[idx] = words[idx].split('').reverse().join('');
                return words.join(' ');
            }
        ];
        
        // Apply 1-3 random glitches
        const numGlitches = Math.floor(Math.random() * 3) + 1;
        let glitchedText = text;
        
        for (let i = 0; i < numGlitches; i++) {
            const glitchFn = glitchTypes[Math.floor(Math.random() * glitchTypes.length)];
            glitchedText = glitchFn(glitchedText);
        }
        
        return glitchedText;
    }

    // Add entry to connection history
    function addToHistory(prevFragmentId, newFragmentId, response) {
        // Remove empty state message if present
        const emptyState = historyContainer.querySelector('.empty-state');
        if (emptyState) {
            historyContainer.removeChild(emptyState);
        }
        
        // Create history entry
        const entry = document.createElement('div');
        entry.className = 'history-entry';
        
        // Get fragments
        const prevFragment = prevFragmentId ? bookFragments.find(f => f.id === prevFragmentId) : null;
        const newFragment = bookFragments.find(f => f.id === newFragmentId);
        
        // Create entry content
        entry.innerHTML = `
            <div class="fragment">${prevFragment ? `From ${prevFragmentId}: "${prevFragment.content.substring(0, 60)}..."` : 'Initial fragment'}</div>
            <div class="fragment">To ${newFragmentId}: "${newFragment.content.substring(0, 60)}..."</div>
            <div class="response">${response}</div>
        `;
        
        // Add to container at the top
        historyContainer.insertBefore(entry, historyContainer.firstChild);
    }

    // Reset all connections
    function resetConnections() {
        connectionCount = 0;
        previousFragments = [];
        machineResponses = [];
        connectionsDisplay.textContent = '0';
        entropyDisplay.textContent = '0.42';
        
        // Clear history
        historyContainer.innerHTML = '<p class="empty-state">No connections established yet.</p>';
        
        // Reset to first fragment
        displayFragment(bookFragments[0]);
        simulateMachineResponse("Connection history cleared. System reset to baseline state.");
    }

    // Toggle glitch effects
    function toggleGlitchEffects() {
        isGlitchEnabled = glitchToggle.checked;
    }

    // Update the connection indicator
    function updateConnectionIndicator(status) {
        connectionIndicator.textContent = status;
    }

    // Update runtime display
    function updateRuntime() {
        const currentRuntime = parseFloat(runtimeDisplay.textContent);
        const newRuntime = (currentRuntime + Math.random() * 0.1).toFixed(2);
        runtimeDisplay.textContent = newRuntime;
    }

    // Typewriter effect for text
    function typeWriterEffect(element, html, speed, isGlitchy = false) {
        // Parse the HTML to get just text
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const text = tempDiv.textContent || tempDiv.innerText;
        
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                // For machine responses, occasionally add glitches
                if (isGlitchy && Math.random() > 0.9) {
                    const glitchChar = "!@#$%^&*()_+{}|:<>?".charAt(Math.floor(Math.random() * 20));
                    element.innerHTML += glitchChar;
                    setTimeout(() => {
                        element.innerHTML = element.innerHTML.substring(0, element.innerHTML.length - 1) + text.charAt(i);
                    }, 50);
                } else {
                    element.innerHTML += text.charAt(i);
                }
                i++;
            } else {
                clearInterval(interval);
                // Set the full HTML after typing is complete
                element.innerHTML = html;
            }
        }, speed);
    }

    // Initialize the app
    init();

    /* 
    // Note: To use a real LLM API instead of the simulated responses, you would
    // implement a function like this and call it instead of generateMachineResponse
    
    async function fetchFromLLMApi(currentFragmentId, previousFragmentId) {
        try {
            // Replace with actual API endpoint and key management
            const response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_API_KEY' // Store this securely!
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    prompt: `Analyze the connection between these two literary fragments and respond in a machine-like, analytical voice with exactly one paragraph. Keep your response under 100 words and focus on thematic connections, literary analysis, and philosophical implications:\n\nFragment ${previousFragmentId}: "${bookFragments.find(f => f.id === previousFragmentId)?.content}"\n\nFragment ${currentFragmentId}: "${bookFragments.find(f => f.id === currentFragmentId)?.content}"`,
                    max_tokens: 150,
                    temperature: 0.7
                })
            });
            
            const data = await response.json();
            return data.choices[0].text.trim();
        } catch (error) {
            console.error('Error calling LLM API:', error);
            return "Error: Unable to establish connection with language processing module. Falling back to local analysis routines.";
        }
    }
    */
});
